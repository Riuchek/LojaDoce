<script setup lang="ts">

interface Relatorio {
    id: number
    isPaid: boolean
    name: string
    value: number
}

const relatorios = ref<Relatorio[]>([])

onMounted(async () => {
    const data = await $fetch<Relatorio[]>('/api/relatorios/get')
    relatorios.value = data
})

const newRelatorio = ref({
    name: '',
    isPaid: false,
    value: 0
})

async function addRelatorio() {
    if (!newRelatorio.value.name.trim()) return;
    
    try {
        const savedRelatorio = await $fetch('/api/relatorios/post', {
            method: 'POST',
            body: {
                name: newRelatorio.value.name,
                isPaid: newRelatorio.value.isPaid,
                value: newRelatorio.value.value
            }
        });
        
        relatorios.value.push(savedRelatorio as Relatorio);
        newRelatorio.value.name = '';
        newRelatorio.value.isPaid = false;
        newRelatorio.value.value = 0;
    } catch (error) {
        console.error('Error saving relatório:', error);
    }
}


async function removeRelatorio(id: number) {
    try {
        await $fetch(`/api/relatorios/delete/${id}`, {
            method: 'DELETE'
        });
        relatorios.value = relatorios.value.filter(relatorio => relatorio.id !== id);
    } catch (error) {
        console.error('Error removing relatório:', error);
    }
}

async function toggleIsPaid(relatorio: Relatorio) {
    try {
        await $fetch(`/api/relatorios/put/${relatorio.id}`, {
            method: 'PUT',
            body: {
                isPaid: !relatorio.isPaid
            }
        });
        relatorio.isPaid = !relatorio.isPaid;
    } catch (error) {
        console.error('Error updating relatório status:', error);
    }
}

async function exportToPDF() {
    try {
        const { jsPDF } = await import('jspdf')
        const { default: autoTable } = await import('jspdf-autotable')
        
        const doc = new jsPDF()
        
        // Add title
        doc.setFontSize(16)
        doc.text('Relatórios', 14, 15)
        
        // Add table
        autoTable(doc, {
            head: [['Nome do Relatório', 'Valor', 'Status']],
            body: relatorios.value.map(relatorio => [
                relatorio.name,
                `R$ ${relatorio.value.toFixed(2)}`,
                relatorio.isPaid ? 'Pago' : 'Não pago'
            ]),
            startY: 25,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 5,
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontSize: 12,
                fontStyle: 'bold',
            },
        })
        
        // Save the PDF
        doc.save('relatorios.pdf')
    } catch (error) {
        console.error('Error generating PDF:', error)
    }
}
</script>

<template>
    <div class="relatorios-container">
        <div class="header-actions">
            <h1 class="text-2xl font-bold text-center mb-6">Relatorios</h1>
            <button @click="exportToPDF" class="export-btn">
                Exportar PDF
            </button>
        </div>
        <div class="excel-sheet">
            <div class="sheet-header">
                <div class="header-cell">Nome do Relatório</div>
                <div class="header-cell">Valor</div>
                <div class="header-cell">Status</div>
            </div>
            <div class="sheet-body">
                <div v-for="relatorio in relatorios" :key="relatorio.id" class="sheet-row">
                    <div class="sheet-cell">{{ relatorio.name }}</div>
                    <div class="sheet-cell">{{ relatorio.value }}</div>
                    <div class="sheet-cell">
                        <button 
                            :class="['status-button', relatorio.isPaid ? 'paid' : 'unpaid']"
                            @click="toggleIsPaid(relatorio)"
                        >
                            {{ relatorio.isPaid ? 'Pago' : 'Não pago' }}
                        </button>
                        <button 
                            v-if="relatorio.isPaid"
                            @click="removeRelatorio(relatorio.id)" 
                            class="delete-btn"
                        >
                            Remover
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <form class="add-form" @submit.prevent="addRelatorio">
            <input
                v-model="newRelatorio.name"
                type="text"
                placeholder="Nome do Relatório"
                class="input"
                required
            />
            <select v-model="newRelatorio.isPaid" class="input">
                <option :value="true">Pago</option>
                <option :value="false">Não pago</option>
            </select>
            <input
                v-model="newRelatorio.value"
                type="number"
                placeholder="Valor"
                class="input"
                required
            />
            <button type="submit" class="add-btn">Adicionar</button>
        </form>
    </div>
</template>

<style scoped>
.relatorios-container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: #f8f9fa;
}

.excel-sheet {
    width: 100%;
    max-width: 800px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.sheet-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    background-color: #f1f3f4;
    border-bottom: 2px solid #e0e0e0;
}

.header-cell {
    padding: 1rem;
    font-weight: 600;
    color: #1f2937;
    text-align: left;
    border-right: 1px solid #e0e0e0;
}

.header-cell:last-child {
    border-right: none;
}

.sheet-body {
    display: flex;
    flex-direction: column;
}

.sheet-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    border-bottom: 1px solid #e0e0e0;
    transition: background-color 0.2s ease;
}

.sheet-row:hover {
    background-color: #f8f9fa;
}

.sheet-row:last-child {
    border-bottom: none;
}

.sheet-cell {
    padding: 1rem;
    display: flex;
    align-items: center;
    border-right: 1px solid #e0e0e0;
    min-height: 60px;
}

.sheet-cell:last-child {
    border-right: none;
}

.status-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 100px;
    text-align: center;
    margin-right: 0.5rem;
}

.status-button.paid {
    background-color: #4CAF50;
    color: white;
}

.status-button.paid:hover {
    background-color: #43A047;
}

.status-button.unpaid {
    background-color: #f44336;
    color: white;
}

.status-button.unpaid:hover {
    background-color: #E53935;
}

.add-form {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 800px;
}

.input {
    padding: 0.5rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
    min-width: 150px;
}

.input:focus {
    border-color: #4CAF50;
}

.add-btn {
    padding: 0.5rem 1.5rem;
    background-color: #1976d2;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    min-width: 120px;
}

.add-btn:hover {
    background-color: #1565c0;
}

.delete-btn {
    padding: 0.5rem 1rem;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.delete-btn:hover {
    background-color: #c82333;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.export-btn {
    padding: 0.5rem 1.5rem;
    background-color: #2ecc71;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.export-btn:hover {
    background-color: #27ae60;
}
</style>