
const API_URL = 'https://localhost:44325/api/Pessoas';
const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

// Carregar alunos
async function loadStudents() {
    try {
        const response = await fetch(API_URL);
        const students = await response.json();
        displayStudents(students);
    } catch (error) {
        console.error('Erro ao carregar alunos:', error);
    }
}

// Exibir alunos na tabela
function displayStudents(students) {
    studentList.innerHTML = '';
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.nome}</td>
            <td>${student.telefone}</td>
            <td>${student.idade}</td>
            <td class="actions">
                <button onclick="editStudent(${student.id})" class="btn-edit">Editar</button>
                <button onclick="deleteStudent(${student.id})" class="btn-delete">Excluir</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}

// Adicionar ou atualizar aluno
studentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const studentId = document.getElementById('studentId').value;
    const student = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        idade: parseInt(document.getElementById('idade').value)
    };

    try {
        const method = studentId ? 'PUT' : 'POST';
        const url = studentId ? `${API_URL}/${studentId}` : API_URL;

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student)
        });

        if (response.ok) {
            studentForm.reset();
            document.getElementById('studentId').value = '';
            loadStudents();
        }
    } catch (error) {
        console.error('Erro ao salvar aluno:', error);
    }
});

// Editar aluno
async function editStudent(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const student = await response.json();
        
        document.getElementById('studentId').value = student.id;
        document.getElementById('nome').value = student.nome;
        document.getElementById('telefone').value = student.telefone;
        document.getElementById('idade').value = student.idade;
    } catch (error) {
        console.error('Erro ao carregar aluno:', error);
    }
}

// Excluir aluno
async function deleteStudent(id) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadStudents();
            }
        } catch (error) {
            console.error('Erro ao excluir aluno:', error);
        }
    }
}

// Carregar alunos ao iniciar a página
loadStudents();