////////// setup do servidor e outros //////////
import { TUser, TProduct, TPurchase, TProductEdit } from './types';
import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import { db } from './database/knex';
const app = express();
app.use(express.json());
app.use(cors());
app.listen(3003, () => {
  console.log('Servidor rodando na porta 3003');
});
//////////////////////////////////////

// teste servidor//
app.get('/ping', (req: Request, res: Response) => {
  res.send('Pong!');
});



/////// a partir daqui //

/// ex. 1 get all users - verificado///
app.get("/users", async (req: Request, res: Response) => {
  try {
      const result = await db.raw('SELECT * FROM users;')
      res.status(200).send(result)
  } catch (error) {
      console.log(error)

      if (res.statusCode === 200) {
          res.status(500)
      }
      
      if (error instanceof Error) {
          res.send(error.message)
      } else {
          res.send("Erro inesperado")
      }
  }
})
/// ex. 2 create user - verificado ///
app.post("/users", async (req: Request, res: Response) => {
  try {
  
    const {id, name, email, password} = req.body
    
  
    if (!req.body.id || !req.body.email || !req.body.password) {
      res.status(400).send("Por favor, preencha todos os campos")
      return
    }
    if (id.length < 3) {
      res.status(400).send("Nome deve conter no mínimo 3 caracteres")
      return
    }
    if (email.length < 6) {
      res.status(400).send("Senha deve conter no mínimo 6 caracteres")
      return
      
    }
    if (password.length < 6) {
      res.status(400).send("Senha deve conter no mínimo 6 caracteres")
      return
    }
    const newUser: TUser = {
      id: id,
      name: name,
      email: email,
      password: password
    }
    console.log(newUser);
    
    await db("users").insert(newUser)
    res.status(200).send("Usuário criado com sucesso")
  } catch (error) {
    console.log(error)
  
    if (res.statusCode === 200) {
      res.status(500)
    }
  
    if (error instanceof Error){
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
    
  }
  })

// ex. 3 create product - verificado //
app.post("/products", async (req: Request, res: Response) => {
  try { const {id, category, name, price, description, image, quantity} = req.body

    if (!req.body.id || !req.body.category || !req.body.name || !req.body.price || !req.body.description || !req.body.image) {
      res.status(400).send("Por favor, preencha todos os campos")
      return
    } 
    if (id.length < 1) {
      res.status(400).send("o ID deve conter no mínimo 3 caracteres")
      return
    }
    if (category.length < 3) {
      res.status(400).send("a Categoria deve conter no mínimo 3 caracteres")
      return
    }
    if (name.length < 3) {
      res.status(400).send("o Nome deve conter no mínimo 3 caracteres")
      return
    }
    if (price.length < 3) {
      res.status(400).send("p preço deve ser no mínimo 3 caracteres")
      return
    }
    if (description.length < 3) {
      res.status(400).send("Senha deve conter no mínimo 3 caracteres")
      return
    }
    if (image.length < 3) {
      res.status(400).send("Senha deve conter no mínimo 3 caracteres")
      return
    }
    const newProduct: TProduct = {
      id: id,
      category: category,
      name: name,
      price: price,
      description: description,
      image: image,
      quantity: quantity
    }
    await db("products").insert(newProduct)
    res.status(200).send("Produto criado com sucesso")

  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }
    
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }


  }
})


/// ex. 4 get all products funcionalidade 1 e 2 - verificados /// 
app.get("/products", async (req: Request, res: Response) => {

  try {
    const searchTerm = req.query.q as string | undefined

    if (searchTerm === undefined) {
        const result = await db("products")
        res.status(200).send(result)
    } else {
        const result = await db("products")
            .where("name", "LIKE", `%${searchTerm}%`)
            .orWhere("category", "LIKE", `%${searchTerm}%`)

        res.status(200).send(result)
    }


  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
    
  }
})


///  ex.5 edit product by id  - verificado///

app.put("/editproducts/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    if (!req.body.category || !req.body.name || !req.body.price || !req.body.description || !req.body.image) {
      res.status(400).send("Por favor, preencha todos os campos")
      return
    }

    const product = await db("products").where({id: id})
    if (product.length === 0) {
      res.status(404).send("Produto não encontrado")
      return
    }

    const productByName = await db("products").where({name: req.body.name})
    if (productByName.length > 0) {
      res.status(400).send("Já existe um produto com esse nome")
      return
    }

    const {category, name, price, description, image} = req.body

    
    const newProduct: TProductEdit = {
      category : category || product[0].category, 
      name : name || product[0].name,
      price : price   || product[0].price,  
      description : description || product[0].description,
      image : image || product[0].image
    }

    await db("products").update(newProduct).where({id: id})
    res.status(200).send("Produto editado com sucesso")

  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

/// ex.6 create purchase ///
app.post("/purchase", async (req: Request, res: Response) => {
  
  try {
    const {id, buyeriD, totalPrice } = req.body
    let products = req.body.products
    console.log(products);
    
const newPurchase = {
  id:id,
  buyeriD: buyeriD,
  totalPrice: totalPrice,

}
await db("purchase").insert(newPurchase)

for  (let product of products) {
  await db("purchases_products").insert({
    purchases_id: id,
    products_id: product.id,
    quantity: product.quantity
  })
}


res.status(200).send("Compra criada com sucesso")

  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }})

// ex.7 delete purchase by id - verificado ///
app.delete("/deletepurchase/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const purchase = await db("purchase").where({id: id})
    if (purchase.length === 0) {
      res.status(404).send("Compra não encontrada")
      return
    }
    await db("purchases_products").delete().where({purchases_id: id})
    await db("purchase").delete().where({id: id})
    res.status(200).send("Compra deletada com sucesso")

  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

  
// ex.8 get purchase by id - verificado ///

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
const id = req.params.id
const purchase = await db("purchase").where({id: id})
const [buyerid] = await db("purchase").where({id: id}).select("buyeriD")
const userdata = await db("users").where({id: buyerid.buyerID}).select("id", "name", "email")

const products = await db("purchases_products")
.where({purchases_id: id})
.join("products", "products.id", "purchases_products.products_id")
.select("products.id", "products.name", "products.price", "products.image", "purchases_products.quantity")

const result = [{venda:purchase}, {usuer:userdata}, {products:products}]
    
    res.status(200).send(result)
  } catch (error) {
    console.log(error) 

    if (res.statusCode === 200) {
      res.status(500)
    }
    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})



