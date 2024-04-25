"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Modal from "./Modal";
import useuploadModal from "@/hooks/useUploadModal";
import { useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const UploadModal = useuploadModal();
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      UploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Add a song"
      description="Upload a song "
      isOpen={UploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="song author"
        />
        <div>
          Select a song file
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true })}
            placeholder="song"
          />
        </div>
        <div>
          Select an image
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
            placeholder="image"
          />
        </div>
        <Button disabled={isLoading}>Create</Button>
      </form>
    </Modal>
  );
};
export default UploadModal;
