import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="p-20 ">
      <ul>
        <li>
          <Button asChild variant={"link"}>
            <Link href={"/login"}>Login Page</Link>
          </Button>
        </li>
      </ul>
    </div>
  );
}
