<template>
  <div>
    <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">مدیریت دسته‌بندی‌ها</h2>
      <button @click="openAddModal" class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 flex items-center transition-colors">
        <Plus :size="20" class="ml-2" />
        <span>افزودن دسته‌بندی</span>
      </button>
    </div>

    <DataTable :headers="categoryHeaders" :items="categories" :loading="loading">
      <template #cell-parent="{ item }">
        {{ item.parent || '—' }}
      </template>
      <template #cell-actions="{ item }">
        <div class="flex space-x-2 space-x-reverse">
          <button @click="openEditModal(item)" class="text-blue-500 hover:text-blue-700 p-1"><FilePenLine :size="18" /></button>
          <button @click="handleDeleteCategory(item)" class="text-red-500 hover:text-red-700 p-1"><Trash2 :size="18" /></button>
        </div>
      </template>
    </DataTable>

    <!-- Add/Edit Category Modal -->
    <AppModal :show="showCategoryModal" @close="closeModal" :title="modalTitle">
      <form @submit.prevent="handleSaveCategory" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1 dark:text-gray-300">نام دسته‌بندی</label>
          <input v-model="editableCategory.name" type="text" class="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 dark:text-gray-300">دسته‌بندی والد (اختیاری)</label>
          <select v-model="editableCategory.parent" class="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <option :value="null">—</option>
            <option v-for="cat in parentCategories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
          </select>
        </div>
      </form>
      <template #footer>
        <div class="flex justify-end space-x-2 space-x-reverse">
          <button @click="closeModal" class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">لغو</button>
          <button @click="handleSaveCategory" class="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700">ذخیره</button>
        </div>
      </template>
    </AppModal>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { productService } from '@/services/productService';
import { useToastStore } from '@/store/toast';
import DataTable from '@/components/common/DataTable.vue';
import AppModal from '@/components/ui/AppModal.vue';
import { Plus, FilePenLine, Trash2 } from 'lucide-vue-next';

const categories = ref([]);
const loading = ref(true);
const showCategoryModal = ref(false);
const isEditing = ref(false);
const toastStore = useToastStore();

const editableCategory = reactive({
  id: null,
  name: '',
  parent: null,
  productCount: 0,
});

const categoryHeaders = [
  { key: 'id', label: 'شناسه' },
  { key: 'name', label: 'نام دسته‌بندی' },
  { key: 'parent', label: 'والد' },
  { key: 'productCount', label: 'تعداد محصولات' },
  { key: 'actions', label: 'عملیات' },
];

const modalTitle = computed(() => (isEditing.value ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی جدید'));
const parentCategories = computed(() => categories.value.filter(c => c.id !== editableCategory.id));

async function fetchCategories() {
  loading.value = true;
  try {
    categories.value = await productService.getCategories();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    toastStore.showToast('خطا در دریافت لیست دسته‌بندی‌ها', 'error');
  } finally {
    loading.value = false;
  }
}

function resetEditableCategory() {
  Object.assign(editableCategory, { id: null, name: '', parent: null, productCount: 0 });
}

function openAddModal() {
  isEditing.value = false;
  resetEditableCategory();
  showCategoryModal.value = true;
}

function openEditModal(category) {
  isEditing.value = true;
  Object.assign(editableCategory, category);
  showCategoryModal.value = true;
}

function closeModal() {
  showCategoryModal.value = false;
}

function handleSaveCategory() {
  if (isEditing.value) {
    const index = categories.value.findIndex(c => c.id === editableCategory.id);
    if (index !== -1) {
      categories.value[index] = { ...editableCategory };
    }
    toastStore.showToast('دسته‌بندی با موفقیت ویرایش شد.', 'success');
  } else {
    const newCategory = { ...editableCategory, id: Date.now(), productCount: 0 };
    categories.value.unshift(newCategory);
    toastStore.showToast('دسته‌بندی با موفقیت اضافه شد.', 'success');
  }
  closeModal();
}

function handleDeleteCategory(category) {
  if (confirm(`آیا از حذف دسته‌بندی «${category.name}» مطمئن هستید؟`)) {
    categories.value = categories.value.filter(c => c.id !== category.id);
    toastStore.showToast('دسته‌بندی با موفقیت حذف شد.', 'success');
  }
}

onMounted(fetchCategories);
</script>
