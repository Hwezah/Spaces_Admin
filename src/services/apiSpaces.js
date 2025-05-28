import supabase from "./supabase";
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

export async function createSpace(newSpace) {
  const { data, error } = await supabase
    .from("spaces")
    .insert([newSpace])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Space could not be created.");
  }
  return data;
}
