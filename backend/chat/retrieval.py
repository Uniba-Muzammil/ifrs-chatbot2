from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
import os

# Load embeddings once
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# Cache loaded indexes
FAISS_INDEXES = {}

def load_index(standard):
    if standard not in FAISS_INDEXES:
        FAISS_INDEXES[standard] = FAISS.load_local(
            f"indexes/{standard.lower()}",
            embeddings,
            allow_dangerous_deserialization=True
        )
    return FAISS_INDEXES[standard]


def search_ifrs(standard, question):

    db = load_index(standard)

    docs = db.similarity_search(question, k=1)

    if not docs:
        return None

    result = docs[0]

    return {
        "text": result.page_content,
        "standard": result.metadata["standard"],
        "section": result.metadata["section"],
        "para_id": result.metadata["para_id"]
    }