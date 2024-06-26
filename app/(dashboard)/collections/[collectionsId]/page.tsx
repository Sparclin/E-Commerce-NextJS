"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import Loader from "@/components/custom ui/Loader"
import CollectionForm from "@/components/collections/CollectionForm"

const CollectionDetails = ({params}: {params: {collectionsId: string}}) => {
    const [loading, setLoading] = useState(true)
    const [CollectionDetails, setCollectionDetails] = useState<CollectionType | null>(null)

    const getCollectionDetails = async() => {
        try {
            const res = await axios.get(`/api/collections/${params.collectionsId}`)
            const data = await res.data
            setCollectionDetails(data)
            setLoading(false)
        } catch (error) {
            console.log("[collectionsId_GET]", error);
            toast.error("Something went wrong!")
            setLoading(false)
        }
    }

    useEffect(() => {
        getCollectionDetails()
    }, [])

  return loading ? <Loader /> : (
    <CollectionForm initialData={CollectionDetails} />
  )
}

export default CollectionDetails