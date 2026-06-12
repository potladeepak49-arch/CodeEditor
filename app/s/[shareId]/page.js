import { connectDB } from '@/lib/db'
import { Snippet } from '@/models/Snippet.model'
import { notFound } from 'next/navigation'
import PublicSnippetView from './PublicSnippetView'

export default async function SharedSnippetPage({ params }) {
  await connectDB()

  const snippet = await Snippet.findOne({ shareId: params.shareId })
  if (!snippet) notFound()

  return (
    <PublicSnippetView snippet={JSON.parse(JSON.stringify(snippet))} />
  )
}