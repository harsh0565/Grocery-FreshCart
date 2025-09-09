import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  TextField,
  MenuItem,
  Skeleton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const sortOptions = [
  { value: 'offerPriceAsc', label: 'Offer Price (Low to High)' },
  { value: 'offerPriceDesc', label: 'Offer Price (High to Low)' },
  { value: 'nameAsc', label: 'Name (A-Z)' },
  { value: 'nameDesc', label: 'Name (Z-A)' },
  { value: 'revenue', label: 'Revenue' },
];

const SellerAdminPanel = () => {
  const { isSeller, user, products, fetchProducts, axios, currency } = useAppContext();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSeller) {
      toast.error('You are not authorized');
      navigate('/');
    } else {
      let firstLoad = true;

      const loadProducts = async () => {
        await fetchProducts();
        if (firstLoad) {
          setLoading(false);
          firstLoad = false;
        } else {
          toast.success('Data auto-refreshed');
        }
      };

      loadProducts();

      const interval = setInterval(loadProducts, 30000); // Auto-refresh every 30s
      return () => clearInterval(interval); // Cleanup
    }
  }, [isSeller]);

  const sellerProducts = products
    .filter((p) => p.sellerId === user?._id)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  if (sortBy) {
    sellerProducts.sort((a, b) => {
      switch (sortBy) {
        case 'offerPriceAsc':
          return a.offerPrice - b.offerPrice;
        case 'offerPriceDesc':
          return b.offerPrice - a.offerPrice;
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        case 'revenue':
          return (b.offerPrice * (b.sold || 0)) - (a.offerPrice * (a.sold || 0));
        default:
          return 0;
      }
    });
  }

  const totalRevenue = sellerProducts.reduce((acc, p) => acc + (p.offerPrice * (p.sold || 0)), 0);
  const totalStock = sellerProducts.reduce((acc, p) => acc + (p.stock || 0), 0);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/product/delete/${id}`);
      if (data.success) {
        toast.success('Deleted!');
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Error deleting product');
    }
  };

  const salesData = [
    { month: 'Jan', revenue: 400 },
    { month: 'Feb', revenue: 300 },
    { month: 'Mar', revenue: 600 },
    { month: 'Apr', revenue: 500 },
    { month: 'May', revenue: 700 },
  ];

  return (
    <motion.div initial="hidden" animate="show" variants={fadeIn}>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          📦 Seller Dashboard
        </Typography>

        {/* Stats Summary */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {[['Total Products', sellerProducts.length],
            ['Total Stock', totalStock],
            ['Revenue', `${currency} ${totalRevenue.toFixed(2)}`],
          ].map(([label, value], i) => (
            <Grid item xs={12} sm={4} key={i}>
              <motion.div whileHover={{ scale: 1.03 }}>
                <Paper elevation={4} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle1">{label}</Typography>
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    {value}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Chart */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h6">📊 Monthly Sales Overview</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Controls */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
          />
          <TextField
            select
            label="Sort by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            size="small"
          >
            {sortOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/add-product')}
          >
            Add Product
          </Button>
        </Box>

        {/* Product Table */}
        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Offer Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Sold</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton height={30} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : sellerProducts.map((p, i) => (
                    <motion.tr
                      key={p._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      style={{ display: 'table-row' }}
                    >
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{currency} {p.price}</TableCell>
                      <TableCell>{currency} {p.offerPrice}</TableCell>
                      <TableCell>{p.stock}</TableCell>
                      <TableCell>{p.sold || 0}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          onClick={() => navigate(`/admin/edit-product/${p._id}`)}
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDelete(p._id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
              {!loading && sellerProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No products found. Try adding one!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>  
          </Table>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default SellerAdminPanel;
