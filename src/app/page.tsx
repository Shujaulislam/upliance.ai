"use client"

import Counter from "@/components/Counter"
import UserDataForm from "@/components/UserDataForm"
import RichTextEditor from "@/components/RichTextEditor"
import Tiptap from "@/components/TipTap"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Upliance.ai assignment</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        <Counter />
        <Tiptap />
        <RichTextEditor />
        <UserDataForm />
      </div>
    </main>
  )
}

