import { Icon } from "@iconify/react";
import { Button, TableCell, TextField } from "@mui/material";
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { CrudActions } from '../../components/CrudActions';
import DataTable from '../../components/DataTable';
import { CustomTableCell } from '../../components/DataTable/TableCell';
import { ProductDTO } from "./dto/ProductDTO";
import { ProductService } from "./product.service";
import { CustomModal } from "../../components/CustomModal";

const tableHead = ["Ações", "Produto", "Preço", "Categoria", "Data de Criação"];

export default function ProductListScreen() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [productsData, setProductsData] = useState<ProductDTO[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loadProducts = async () => {
    try {
      const request = await ProductService.getAllPaginated({
        search
      });

      if (request) {
        setProductsData(request.data);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      await ProductService.deleteProduct(id);
      await loadProducts();


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message)
    } finally {
      handleCloseModal();
    }
  }

  const handleOpenModal = (id: string) => {
    setSelectedProductId(id);
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProductId(null);
  }

  useEffect(() => {
    loadProducts();
  }, [search]);

  return (
    <div className="container mx-auto p-6">
      <CustomModal
        open={modalOpen}
        onClose={handleCloseModal}
        onConfirm={() => handleDeleteProduct(selectedProductId!)}
      />

      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Lista de Produtos</h1>
      </div>

      <div className="flex justify-between items-center mb-6 space-x-4">
        <TextField
          label="Buscar por nome..."
          name="name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          margin="normal"
          className="flex-1"
          style={{ margin: 0 }}
        />

        <Button variant="contained" color="primary" style={{ height: "54px" }} onClick={() => navigate("/product/add")}>
          <Icon icon="carbon:add-alt" width={18} height={18} color="#ffffff" style={{ marginRight: '8px' }} />
          Adicionar
        </Button>
      </div>

      <DataTable
        headCells={tableHead}
      >
        {productsData.length === 0 ? (
          <TableRow className="p-2 w-full">
            <TableCell colSpan={5} sx={{ textAlign: "center" }}>
              Nenhum dado encontrado
            </TableCell>
          </TableRow>
        ) : (
          productsData.map((product) => (
            <TableRow
              tabIndex={-1}
              key={product.id}
            >
              <CrudActions
                actions={["edit", "delete"]}
                handleEdit={() => navigate(`/product/edit/${product.id}`)}
                handleDelete={() => handleOpenModal(product.id!)}
              />
              <CustomTableCell content={product.name} />
              <CustomTableCell content={new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(product.price)} />
              <CustomTableCell content={product.category} />
              <CustomTableCell content={product?.createdAt ? new Intl.DateTimeFormat('pt-BR').format(
                new Date(product.createdAt)
              ) : ""} />
            </TableRow>
          ))
        )}
      </DataTable>
    </div>
  );
}
