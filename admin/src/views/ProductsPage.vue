<template>
  <div>
    <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">مدیریت محصولات</h2>
      <button @click="openAddModal" class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center transition-colors">
        <Plus :size="20" class="ml-2" />
        <span>افزودن محصول جدید</span>
      </button>
    </div>

    <DataTable :headers="productHeaders" :items="products" :loading="loading">
      <template #cell-price="{ item }">
        {{ formatPrice(item.price) }} تومان
      </template>
      <template #cell-status="{ item }">
        <span
          class="px-2 py-1 text-xs rounded-full font-semibold"
          :class="item.status === 'منتشر شده' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'"
        >
          {{ item.status }}
        </span>
      </template>
      <template #cell-actions="{ item }">
        <div class="flex space-x-2 space-x-reverse">
          <button @click="openEditModal(item)" class="text-blue-500 hover:text-blue-700 p-1"><FilePenLine :size="18" /></button>
          <button @click="handleDeleteProduct(item)" class="text-red-500 hover:text-red-700 p-1"><Trash2 :size="18" /></button>
        </div>
      </template>
    </DataTable>

    <!-- Add/Edit Product Modal -->
    <AppModal :show="showProductModal" @close="closeModal" :title="modalTitle">
      <form @submit.prevent="handleSaveProduct" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1 dark:text-gray-300">عنوان محصول</label>
          <input v-model="editableProduct.title" type="text" class="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 dark:text-gray-300">توضیحات</label>
          <textarea v-model="editableProduct.description" rows="4" class="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"></textarea>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-300">قیمت (تومان)</label>
            <input v-model.number="editableProduct.price" type="number" class="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1 dark:text-gray-300">موجودی</label>
            <input v-model.number="editableProduct.stock" type="number" class="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required>
          </div>
        </div>
      </form>
      <template #footer>
        <div class="flex justify-end space-x-2 space-x-reverse">
          <button @click="closeModal" class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">لغو</button>
          <button @click="handleSaveProduct" class="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700">ذخیره</button>
        </div>
      </template>
    </AppModal>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { productService } from '@/services/productService';
import { formatPrice } from '@/utils/formatters';
import { useToastStore } from '@/store/toast';
import DataTable from '@/components/common/DataTable.vue';
import AppModal from '@/components/ui/AppModal.vue';
import { Plus, FilePenLine, Trash2 } from 'lucide-vue-next';

const products = ref([]);
const loading = ref(true);
const showProductModal = ref(false);
const isEditing = ref(false);
const toastStore = useToastStore();

const editableProduct = reactive({
  id: null,
  title: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  status: 'منتشر شده',
});

const productHeaders = [
  { key: 'id', label: 'شناسه' },
  { key: 'title', label: 'عنوان محصول' },
  { key: 'category', label: 'دسته‌بندی' },
  { key: 'price', label: 'قیمت' },
  { key: 'stock', label: 'موجودی' },
  { key: 'status', label: 'وضعیت' },
  { key: 'actions', label: 'عملیات' },
];

const modalTitle = computed(() => (isEditing.value ? 'ویرایش محصول' : 'افزودن محصول جدید'));

async function fetchProducts() {
  loading.value = true;
  try {
    products.value = await productService.getProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    toastStore.showToast('خطا در دریافت لیست محصولات', 'error');
  } finally {
    loading.value = false;
  }
}

function resetEditableProduct() {
  Object.assign(editableProduct, {
    id: null, title: '', description: '', price: 0, stock: 0, category: 'عمومی', status: 'منتشر شده'
  });
}

function openAddModal() {
  isEditing.value = false;
  resetEditableProduct();
  showProductModal.value = true;
}

function openEditModal(product) {
  isEditing.value = true;
  Object.assign(editableProduct, product);
  showProductModal.value = true;
}

function closeModal() {
  showProductModal.value = false;
}

function handleSaveProduct() {
  // In a real app, you would call productService.createProduct or productService.updateProduct
  if (isEditing.value) {
    const index = products.value.findIndex(p => p.id === editableProduct.id);
    if (index !== -1) {
      products.value[index] = { ...editableProduct };
    }
    toastStore.showToast('محصول با موفقیت ویرایش شد.', 'success');
  } else {
    const newProduct = { ...editableProduct, id: Date.now() }; // Use timestamp as a temporary unique ID
    products.value.unshift(newProduct);
    toastStore.showToast('محصول با موفقیت اضافه شد.', 'success');
  }
  closeModal();
}

function handleDeleteProduct(product) {
  if (confirm(`آیا از حذف محصول «${product.title}» مطمئن هستید؟`)) {
    // In a real app, you would call productService.deleteProduct(product.id)
    products.value = products.value.filter(p => p.id !== product.id);
    toastStore.showToast('محصول با موفقیت حذف شد.', 'success');
  }
}

onMounted(fetchProducts);
</script>
