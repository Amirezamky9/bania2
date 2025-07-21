<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">مدیریت کاربران</h2>
      <!-- A button to add a new user can be added here if needed -->
    </div>

    <DataTable :headers="userHeaders" :items="users" :loading="loading">
      <template #cell-role="{ item }">
        <span
          class="font-semibold"
          :class="item.role === 'ADMIN' ? 'text-pink-500' : 'text-gray-500 dark:text-gray-400'"
        >
          {{ item.role === 'ADMIN' ? 'ادمین' : 'کاربر' }}
        </span>
      </template>
      <template #cell-status="{ item }">
        <span
          class="px-2 py-1 text-xs rounded-full font-semibold"
          :class="item.status === 'فعال' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'"
        >
          {{ item.status }}
        </span>
      </template>
      <template #cell-actions="{ item }">
        <button
          @click="toggleStatus(item)"
          class="text-gray-500 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="item.role === 'ADMIN'"
          title="تغییر وضعیت"
        >
          <ToggleRight v-if="item.status === 'فعال'" :size="22" class="text-green-500" />
          <ToggleLeft v-else :size="22" class="text-red-500" />
        </button>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { productService } from '@/services/productService';
import { useToastStore } from '@/store/toast';
import DataTable from '@/components/common/DataTable.vue';
import { ToggleLeft, ToggleRight } from 'lucide-vue-next';

const users = ref([]);
const loading = ref(true);
const toastStore = useToastStore();

const userHeaders = [
  { key: 'id', label: 'شناسه' },
  { key: 'name', label: 'نام' },
  { key: 'email', label: 'ایمیل' },
  { key: 'role', label: 'نقش' },
  { key: 'status', label: 'وضعیت' },
  { key: 'actions', label: 'عملیات' },
];

async function fetchUsers() {
  loading.value = true;
  try {
    users.value = await productService.getUsers();
  } catch (error) {
    console.error("Failed to fetch users:", error);
    toastStore.showToast('خطا در دریافت لیست کاربران', 'error');
  } finally {
    loading.value = false;
  }
}

function toggleStatus(user) {
  if (user.role === 'ADMIN') {
    toastStore.showToast('امکان تغییر وضعیت ادمین وجود ندارد.', 'error');
    return;
  }
  user.status = user.status === 'فعال' ? 'مسدود' : 'فعال';
  toastStore.showToast(`وضعیت کاربر ${user.name} به «${user.status}» تغییر کرد.`, 'success');
  // In a real app, you would call a service to update the user's status on the server.
}

onMounted(fetchUsers);
</script>
