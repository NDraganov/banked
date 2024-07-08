import { getLoggedInUser } from "@/lib/user.actions";

export default async function Home() {
  const loggedInUser = await getLoggedInUser();

  return (
    <div>
      <h1>Home Page</h1>
      <h2 className="font-extrabold text-xl">{loggedInUser?.name}</h2>
    </div>
  );
}
