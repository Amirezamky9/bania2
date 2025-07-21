<template>
  <div class="space-y-8">
    <!-- Stat Cards Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        :loading="loading.stats"
        title="مجموع درآمد"
        :value="stats ? `${formatPrice(stats.totalRevenue)} تومان` : '0'"
        :icon="TrendingUp"
        color="green"
      />
      <StatCard
        :loading="loading.stats"
        title="سفارشات"
        :value="stats ? stats.totalOrders : '0'"
        :icon="ShoppingCart"
        color="blue"
      />
      <StatCard
        :loading="loading.stats"
        title="محصولات"
        :value="stats ? stats.totalProducts : '0'"
        :icon="Package"
        color="yellow"
      />
      <StatCard
        :loading="loading.stats"
        title="کاربران"
        :value="stats ? stats.totalUsers : '0'"
        :icon="Users"
        color="pink"
      />
    </div>

    <!-- Chart & Recent Activity Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 class="font-bold mb-4 text-gray-800 dark:text-gray-200">تحلیل فروش</h3>
        <div class="h-80"><canvas id="salesChart"></canvas></div>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 class="font-bold mb-4 text-gray-800 dark:text-gray-200">فعالیت‌های اخیر</h3>
        <p class="text-gray-500 dark:text-gray-400">این بخش در حال ساخت است.</p>
        <!-- Activity feed can be implemented here -->
      </div>
    </div>

    <!-- Recent Orders Table Section -->
    <div>
      <h3 class="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">آخرین سفارشات</h3>
      <DataTable :headers="orderHeaders" :items="recentOrders" :loading="loading.orders">
        <template #cell-total="{ item }">
          {{ formatPrice(item.total) }} تومان
        </template>
        <template #cell-status="{ item }">
          <span
            class="px-2 py-1 text-xs rounded-full font-semibold"
            :class="getStatusClass(item.status)"
          >
            {{ item.status }}
          </span>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { productService } from '@/services/productService';
import { formatPrice } from '@/utils/formatters';
import StatCard from '@/components/common/StatCard.vue';
import DataTable from '@/components/common/DataTable.vue';
import Chart from 'chart.js/auto';
import { TrendingUp, ShoppingCart, Package, Users } from 'lucide-vue-next';

const stats = ref(null);
const recentOrders = ref([]);
const loading = reactive({ stats: true, orders: true });
const chartInstance = ref(null);

const orderHeaders = [
  { key: 'id', label: 'شناسه سفارش' },
  { key: 'customer', label: 'مشتری' },
  { key: 'date', label: 'تاریخ' },
  { key: 'total', label: 'مبلغ کل' },
  { key: 'status', label: 'وضعیت' },
];

// Fetches all necessary data for the dashboard
async function fetchData() {
  loading.stats = true;
  loading.orders = true;
  try {
    const [statsData, ordersData] = await Promise.all([
      productService.getDashboardStats(),
      productService.getOrders(),
    ]);
    stats.value = statsData;
    recentOrders.value = ordersData.slice(0, 5); // Show only the 5 most recent orders
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  } finally {
    loading.stats = false;
    loading.orders = false;
  }
}

function createSalesChart() {
  const chartElement = document.getElementById('salesChart');
  if (chartElement) {
    const ctx = chartElement.getContext('2d');
    chartInstance.value = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
        datasets: [{
          label: 'فروش ماهانه (تومان)',
          data: [12, 19, 3, 5, 2, 3].map(d => d * 10000000),
          backgroundColor: 'rgba(219, 39, 119, 0.2)',
          borderColor: 'rgba(219, 39, 119, 1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}

// Helper function to get status badge color
const getStatusClass = (status) => {
  const statusMap = {
    'در حال پردازش': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    'ارسال شده': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    'تحویل داده شده': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    'لغو شده': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  };
  return statusMap[status] || 'bg-gray-100 text-gray-800';
};

onMounted(async () => {
  await fetchData();
  createSalesChart();
});

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }
});
</script>
