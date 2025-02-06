"use client"

import { useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { useStore } from "@/store/store"

const RichTextEditor = () => {
  const { userData } = useStore()

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  })

  useEffect(() => {
    if (editor && userData) {
      const userDataContent = `
        <h2>User Data:</h2>
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Address:</strong> ${userData.address}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Phone:</strong> ${userData.phone}</p>
      `
      editor.commands.setContent(userDataContent)
    }
  }, [editor, userData])

  if (!editor) {
    return null
  }

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Rich Text Editor</h2>
      <div className="border rounded-lg p-2">
        <div className="mb-2 flex gap-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "is-active" : ""}
          >
            Underline
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            Numbered List
          </button>
        </div>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default RichTextEditor

