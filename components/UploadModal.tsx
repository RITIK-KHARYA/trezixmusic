"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Modal from "./Modal";
import useuploadModal from "@/hooks/useUploadModal";
import { useState } from "react";
const UploadModal = () => {
  const [isLoading, setIsLoading] = useState();
  const UploadModal = useuploadModal();

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

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {};
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
          placeholder="Song Title"
        />
      </form>
    </Modal>
  );
};
export default UploadModal;
