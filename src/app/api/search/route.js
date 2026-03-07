import { elastic } from "@/lib/elasticsearch";

export async function GET(req){

  const {searchParams} = new URL(req.url);
  const q = searchParams.get("q");

  const result = await elastic.search({

    index:"products",

    query:{
      multi_match:{
        query:q,
        fields:["name","category"]
      }
    }

  });

  return Response.json(result.hits.hits);

}