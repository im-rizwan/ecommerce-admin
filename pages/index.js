import Layout from "@/components/layout";
import { useSession, signIn, signOut } from "next-auth/react"
export default function Home() {

  const { data: session } = useSession()
  console.log(session)
  return <Layout>
    <div className="text-blue-900 flex justify-between">
      <h2>Assalamulaikum, <b>{session?.user.name}</b> </h2>
      <div className="rounded-lg overflow-hidden"><img src={session?.user.image} className="w-10 h-10 "/></div>
    </div>
  </Layout>
}