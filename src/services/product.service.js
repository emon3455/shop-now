import { ObjectId } from "mongodb";
import DbConnect from "./DbConnect";
import "server-only";

export const getProductsFromDb = async (categoryId) => {
  const db = await DbConnect();
  const productsCollection = db.collection("products");
  const query = {};
  if (categoryId) {
    query.categoryId = categoryId;
  }
  return productsCollection.find(query).toArray();
};

export const getProductByIdFromDb = async (id) => {
  const db = await DbConnect();
  const productsCollection = db.collection("products");
  const query = {
    _id: new ObjectId(id),
  };
  return productsCollection.findOne(query);
};


export const deleteProductByIdFromDb = async(id)=>{
  const db = await DbConnect();
  const productsCollection = db.collection("products");
  const query = {
    _id: new ObjectId(id),
  };
  return productsCollection.deleteOne(query);
}

// export const updateProductFromDb = async(docs)=>{

//   const db = await DbConnect();
//   const productsCollection = db.collection("products");
//   const filter = { _id: new ObjectId(data._id)}

//   const updatedProduct = {
//     $set:{
//       title: data.title,
//       price: data.price,
//       ratings: data.ratings,
//     }
//   };

//   return productsCollection.updateOne(filter, updatedProduct);
// }


// export const getProductsByIdsFromDb = async (ids = []) => {
//   const db = await DbConnect();
//   const productsCollection = db.collection("products");
//   const idsWithObjectId = ids.map((id) => new ObjectId(id));
//   const query = {
//     _id: { $in: idsWithObjectId },
//   };
//   return productsCollection.find(query).toArray();
// };