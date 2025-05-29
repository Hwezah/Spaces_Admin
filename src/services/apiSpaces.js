import supabase, { supabaseUrl } from "./supabase";
export async function getSpaces() {
  const { data, error } = await supabase.from("spaces").select("*");
  if (error) {
    console.error(error);
    throw new Error("Space could not be retrieved.");
  }
  return data;
}

export async function deleteSpace(id) {
  const { data, error } = await supabase.from("spaces").delete().eq("id", id); // targets the row to delete(id matching the id passed to the function)
  if (error) {
    console.error(error);
    throw new Error("Space could not be deleted.");
  }
  return data;
}

export async function createEditSpace(newSpace, id) {
  const hasImagepath = newSpace.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newSpace.image.name}`.replaceAll(
    "/",
    ""
  );
  //checks if the image exists in supabase & if not, uploads a new one with the attached supabaseUrl
  const imagePath = hasImagepath
    ? newSpace.image
    : `${supabaseUrl}/storage/v1/object/public/space-images/${imageName}`;

  // Create or update
  let query = supabase.from("spaces");
  if (!id) query = query.insert([{ ...newSpace, image: imagePath }]);
  if (id) query = query.update({ ...newSpace, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Space could not be created.");
  }
  if (hasImagepath) return data;

  // Upload image only if it's a File
  if (newSpace.image && typeof newSpace.image !== "string") {
    const { error: storageError } = await supabase.storage
      .from("space-images")
      .upload(imageName, newSpace.image);

    if (storageError) {
      await supabase.from("spaces").delete().eq("id", data.id);
      throw new Error(
        "Space image could not be uploaded, and the Space was not created."
      );
    }
  }

  return data;
}
