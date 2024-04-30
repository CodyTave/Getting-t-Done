import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Spinner,
} from "@nextui-org/react";
import { useFileInput } from "@/hooks/useFileInput"; // You need to implement this hook or import it if already available.
import { Image } from "@nextui-org/react";
import { CameraIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
import NextImage from "next/image";

interface CategoryModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onSubmit: () => void;
  categoryId: string | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  categoryId = null,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { file, bind: bindFileInput, previewUrl } = useFileInput();
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      const resp = await fetch(`/api/category/${categoryId}`);
      const data = await resp.json();
      bindFileInput.display(data.image);
      setName(data.name);
      setDescription(data.description);
      setLoading(false);
    };
    if (categoryId) {
      fetchCategory();
    }
  }, []);
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (file) {
      formData.append("image", file);
    }
    setSubmitting(true);

    try {
      const response = await fetch("/api/category", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        setError(error.message);
        throw new Error("Failed to create category");
      }

      onOpenChange();
      onSubmit();
      setName("");
      setDescription("");
      bindFileInput.reset();
    } catch (error) {
      console.error("Error:", error);
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (file) {
      formData.append("image", file);
    }
    setSubmitting(true);

    try {
      const response = await fetch(`/api/category/${categoryId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        setError(error.message);
        throw new Error("Failed to update category");
      }

      setSubmitting(false);
      onOpenChange();
      onSubmit();
      setName("");
      setDescription("");
      bindFileInput.reset();
    } catch (error) {
      console.error("Error:", error);
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/category/${categoryId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Échec de la suppression de cette catégorie");
      }

      setDeleting(false);
      onOpenChange();
      onSubmit();
    } catch (error) {
      setError((error as any).message);
      setDeleting(false);
    } finally {
      setDeleting(false);
    }
  };
  const validateForm = () => {
    if (!name || !description) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Modal
        size="4xl"
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          setName("");
          setDescription("");
          bindFileInput.reset();
        }}
        aria-labelledby="modal-title"
      >
        <form onSubmit={categoryId ? handleUpdate : handleCreate}>
          <ModalContent>
            {(onClose) =>
              loading ? (
                <div className="w-full h-72 flex justify-center items-center">
                  <Spinner color="secondary" />
                </div>
              ) : (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <h1 id="modal-title">
                      {categoryId ? name : "Nouvelle Categorie"}
                    </h1>
                  </ModalHeader>
                  <ModalBody className="">
                    <div className="bg-gray-100 flex justify-center items-center rounded-full w-32 h-32">
                      {previewUrl ? (
                        <Image
                          fallbackSrc="/defaultImage.jpg"
                          as={NextImage}
                          sizes="100%"
                          width={0}
                          height={0}
                          className="w-32 h-32 object-cover rounded-full"
                          src={previewUrl}
                          alt="Preview"
                        />
                      ) : (
                        <p className="text-gray-400 ">No image</p>
                      )}
                    </div>
                    <Button
                      className="flex w-fit text-white/95"
                      onClick={handleButtonClick}
                      color="success"
                      endContent={<CameraIcon className="w-5 h-5" />}
                    >
                      Upload image
                    </Button>
                    <input
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={bindFileInput.onChange}
                      type="file"
                      accept="image/*"
                    />
                    <Input
                      variant="bordered"
                      autoFocus
                      label="Name"
                      placeholder="Enter category name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <Textarea
                      variant="bordered"
                      label="Description"
                      placeholder="Enter category description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                    {categoryId && (
                      <Button
                        isLoading={deleting}
                        onClick={handleDelete}
                        endContent={
                          <TrashIcon className="w-5 h-5 text-red-0" />
                        }
                        variant="flat"
                        className="flex justify-start w-fit px-5 text-red-0 bg-red-0/10"
                      >
                        Supprimer
                      </Button>
                    )}
                    {error && <p className="text-red-0">{error}</p>}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onClick={onClose}>
                      Annuler
                    </Button>
                    <Button isLoading={submitting} type="submit">
                      Sauveguarder
                    </Button>
                  </ModalFooter>
                </>
              )
            }
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CategoryModal;
