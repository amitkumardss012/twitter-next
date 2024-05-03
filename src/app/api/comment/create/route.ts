import prisma from "@/database/DB";
import { errorHandler } from "@/utils/custumError";
import { uploadImage } from "@/utils/uploadImage";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const cookie = await req.cookies;
    const cookieToken = cookie.get("token");
    if (!cookieToken) {
      return errorHandler(400, "user unauthorized", false);
    }
    const decode: any = await jwt.verify(
      cookieToken.value,
      "myNameIsAmitKumar"
    );
    const decodeID = decode?.userID;

    const formData = await req.formData();
    const description = formData.get("description") as string;
    const image = formData.get("image") as unknown as File;
    const post_id: any = formData.get("post_id");

    if (!description && !image) {
      return errorHandler(400, "Description or image is required", false);
    }

    let imageUrl = "";
    if (image) {
      const imageExtensionType: string[] = [
        "svg",
        "png",
        "jpeg",
        "gif",
        "jpg",
        "mp4",
      ];
      const maxSizeMB = 100;

      // Validate file type
      const imageFileName = image.name?.toLowerCase();
      const imageExtension = imageFileName?.substring(
        imageFileName.lastIndexOf(".") + 1
      );
      if (!imageExtensionType.includes(imageExtension)) {
        return NextResponse.json(
          {
            message:
              "File type not supported. File must be svg, png, jpeg, gif, jpg, or mp4.",
            success: false,
          },
          { status: 400 }
        );
      }

      // Validate file size
      const fileSizeMB = image.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeMB > maxSizeMB) {
        return NextResponse.json(
          {
            message: `File should be less than ${maxSizeMB} MB.`,
            success: false,
          },
          { status: 400 }
        );
      }

      // Upload image
      const uploadResult: any = await uploadImage(image, "nextjs");
      imageUrl = uploadResult.url;
    }

    const userPost = await prisma.post.findUnique({
        where: {
          id: Number(post_id)
        }, 
        select: {
            user_id: true
        }
    });
      const postUserID = userPost?.user_id

      const user = await prisma.user.findUnique({
          where: {
              id: postUserID
          },
      })
      

    const comment = await prisma.comment.create({
      data: {
        post_id: Number(post_id),
        contet: description,
        image: imageUrl,
        //   user: { connect: { id: decode?.userID} },
        user_id: decodeID,
        
      },
    });

    await prisma.post.update({
      where: {
        id: Number(post_id),
      },
      data: {
        comment_Count: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(
      {
        message: `you commented on ${user?.username}'s post`,
        comment,
        success: true,
      },
      { status: 200}
    );
  } catch (error) {
    console.log(error);
    return errorHandler(500, error, false);
  }
};
