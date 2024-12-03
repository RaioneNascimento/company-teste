import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from 'react';
import { CategoryEnum } from "../../enums/category";
import { ProductDTO } from "./dto/ProductDTO";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router";
import { ProductService } from "./product.service";

export default function CreateOrUpdateScreen() {
  const params = useParams();
  const { productId } = params;

  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductDTO>({
    name: "",
    price: 0,
    description: "",
    category: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, category: e.target.value as CategoryEnum }));
  };

  const loadProduct = async (id: string) => {
    try {
      const product = await ProductService.getProductById(id);

      if (product) {
        setFormData({
          ...product,
          category: CategoryEnum[product.category as keyof typeof CategoryEnum],
        });
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const priceAsNumber = parseFloat(formData.price.toString());

      const updatedFormData = {
        ...formData,
        price: isNaN(priceAsNumber) ? 0 : priceAsNumber,
      };

      if (productId) {
        await ProductService.updateProduct(productId, updatedFormData);
        alert("Produto atualizado com sucesso!");
      } else {
        await ProductService.createProduct(updatedFormData);
        alert("Produto criado com sucesso!");
      }
    } catch (error: any) {
      alert(`Erro ao salvar produto: ${error.message}`);
    }
  };


  useEffect(() => {
    if (productId) loadProduct(productId);
  }, [])

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{productId ? "Editar Produto" : "Adicionar Produto"}</h1>
      </div>

      <TextField
        label="Nome"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Preço"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Categoria"
        name="category"
        value={formData.category}
        onChange={handleSelectChange}
        fullWidth
        margin="normal"
        select
      >
        {Object.values(CategoryEnum).map((category) => (
          <MenuItem key={category} value={CategoryEnum[category]}>
            {category}
          </MenuItem>
        )
        )}
      </TextField>

      <TextField
        label="Descrição"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        multiline
        rows={3}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" color="secondary" onClick={() => navigate("products")}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {productId ? "Salvar Alterações" : "Criar Produto"}
        </Button>
      </Box>
    </div>
  );
}
