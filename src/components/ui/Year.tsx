/** Current year. Cached (Cache Components), so it is part of the static shell and refreshes on revalidation. */
export async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}
