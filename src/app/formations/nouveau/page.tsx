"use client";
import {
  Avatar,
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import {
  ArrowRightIcon,
  CameraIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/20/solid";
import { useFileInput } from "@/hooks/useFileInput";
import MultilineInput from "@/Components/MultilineInput";
import ProgramPart from "@/Components/ProgramPart";
import { useRouter } from "next/navigation";

export default function Formation({ params }: { params: { id: string } }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { file, bind: bindFileInput, previewUrl } = useFileInput();
  const [categories, setCategories] = useState<any>([]);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [form, setForm] = useState<any>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [durationSuffix, setDurationSuffix] = useState("heures");
  const [objectifs, setObjectifs] = useState<string[]>([""]);
  const [target, setTarget] = useState<string[]>([""]);
  const [prerequisite, setPrerequisite] = useState<string[]>([""]);
  const [pedagogy, setPedagogy] = useState<string[]>([""]);
  const [program, setProgram] = useState<{ title: string; parts: string[] }[]>([
    { title: "", parts: [""] },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "duration") {
      setForm({
        ...form,
        [e.target.name]: e.target.value + " " + durationSuffix,
      });
      return;
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleTitleChange = (index: number, newTitle: string) => {
    const updatedProgram = [...program];
    updatedProgram[index].title = newTitle;
    setProgram(updatedProgram);
  };

  const handlePartsChange = (index: number, newParts: string[]) => {
    const updatedProgram = [...program];
    updatedProgram[index].parts = newParts;
    setProgram(updatedProgram);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      setFetchingCategories(true);
      try {
        const resp = await fetch("/api/category");
        const data = await resp.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchingCategories(false);
      }
    };
    fetchCategories();
  }, []);
  const addNewModule = () => {
    setProgram([...program, { title: "", parts: [""] }]);
  };
  const removeModule = (index: number) => {
    setProgram(program.filter((_, idx) => idx !== index));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", selectedCategory!);
      if (file) {
        formData.append("image", file);
      }
      if (form.duration) {
        formData.append("duration", form.duration);
      }
      if (form.price) {
        formData.append("price", form.price);
      }
      formData.append("objectifs", objectifs.join("%99"));
      formData.append("target", target.join("%99"));
      formData.append("prerequisite", prerequisite.join("%99"));
      formData.append("pedagogy", pedagogy.join("%99"));
      formData.append("program", JSON.stringify(program));
      const response = await fetch("/api/formation", {
        method: "POST",
        body: formData,
        cache: "no-cache",
      });
      if (!response.ok) {
        const error = await response.json();
        setError(error.message);
        throw new Error("Failed to create formation");
      }
      router.push("/formations");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <form className="space-y-8 grid" onSubmit={handleCreate}>
        <div
          onClick={handleButtonClick}
          className="bg-gray-200 flex justify-center items-center rounded-full w-48 h-48 border-2 hover:bg-gray-400/10 cursor-pointer"
        >
          {previewUrl ? (
            <Image
              fallbackSrc="/defaultImage.jpg"
              as={NextImage}
              sizes="100%"
              width={0}
              height={0}
              className="w-48 h-48 object-cover rounded-full"
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
        <div className="space-y-3">
          <h2 className="text-sm text-gray-400">Informations de base</h2>
          <div className="md:grid-cols-2 grid gap-5">
            <Input
              onChange={handleChange}
              name="title"
              variant="bordered"
              autoFocus
              label="Titre"
              placeholder="Enter Formation title"
              required
            />
            <Select
              variant="bordered"
              isLoading={fetchingCategories}
              items={categories}
              label="Selectionner une catégorie"
              placeholder="Categorie de la formation"
              selectionMode="single"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {(item: any) => (
                <SelectItem
                  onChange={() => setSelectedCategory(item)}
                  textValue={item.name}
                  key={item._id}
                  className="capitalize"
                >
                  <div className="flex gap-2 items-center">
                    <Avatar
                      alt={item.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={item.image}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-xs text-gray-400 truncate line-clamp-1">
                        {item.description}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select>
            <Input
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              onChange={handleChange}
              name="price"
              variant="bordered"
              autoFocus
              label="Prix (optionnel)"
              placeholder="Saisir le prix de la formation"
              type="number"
            />
            <Input
              onChange={handleChange}
              variant="bordered"
              label="Durrée (optionnel)"
              name="duration"
              placeholder="0"
              startContent={<ClockIcon className="w-5 h-5 text-gray-400" />}
              endContent={
                <div className="flex items-center">
                  <label className="sr-only" htmlFor="duration">
                    {"Durrée"}
                  </label>
                  <select
                    onChange={(e) => setDurationSuffix(e.target.value)}
                    className="outline-none border-0 bg-transparent text-default-400 text-small"
                  >
                    <option value="heures">{"Heures"}</option>
                    <option value="jours">{"Jours"}</option>
                    <option value="semaines">{"Semaines"}</option>
                    <option value="mois">{"Mois"}</option>
                  </select>
                </div>
              }
              type="number"
            />
            <Textarea
              onChange={handleChange}
              name="description"
              variant="bordered"
              autoFocus
              label="Description"
              placeholder="Enter Formation title"
              required
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <h2 className="text-sm text-gray-400">
              {"Objectives de la formation"}
            </h2>
            <MultilineInput
              valuesList={objectifs}
              onChange={(values) => setObjectifs(values)}
              label="Objectifs"
              placeholder="Lister les objectifs de la formation"
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-sm text-gray-400">
              {"Publique Vise de la formation"}
            </h2>
            <MultilineInput
              valuesList={target}
              onChange={(values) => setTarget(values)}
              label="Publique Vise"
              placeholder="Lister le publique vise de la formation"
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-sm text-gray-400">
              {"Prerequis de la formation"}
            </h2>
            <MultilineInput
              valuesList={prerequisite}
              onChange={(values) => setPrerequisite(values)}
              label="Prerequis"
              placeholder="Lister les prerequis de la formation"
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-sm text-gray-400">
              {"Modalites Pedagogiques de la formation"}
            </h2>
            <MultilineInput
              valuesList={pedagogy}
              onChange={(values) => setPedagogy(values)}
              label="Modalites Pedagogiques"
              placeholder="Lister les modalites pedagogiques de la formation"
            />
          </div>
        </div>
        <div className="space-y-3 grid">
          <div className="flex justify-between">
            <h2 className="text-sm text-gray-400">
              {"Programme de la formation"}
            </h2>
            <Button
              onClick={addNewModule}
              className="text-white ml-auto"
              color="success"
            >
              {"Ajouter un Module"}
            </Button>
          </div>
          {program.map((item, index) => (
            <ProgramPart
              removeModule={() => removeModule(index)}
              onTitleChange={(title) => handleTitleChange(index, title)}
              onPartsChange={(parts) => handlePartsChange(index, parts)}
              number={index + 1}
              module={item}
              key={index}
            />
          ))}
        </div>
        {error && <p className="text-red-0">{error}</p>}
        <Button
          isLoading={submitting}
          endContent={<PaperAirplaneIcon className="w-5 h-5 text-white" />}
          className="ml-auto px-16 bg-primary-0 text-white"
          type="submit"
        >
          Sauveguarder
        </Button>
      </form>
    </div>
  );
}
