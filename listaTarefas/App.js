import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import TextInputComponent from './components/TextInputComponent';
import FlatListComponent from './components/FlatListComponent';
import TouchableOpacityComponent from './components/TouchableOpacityComponent';
import ModalComponent from './components/ModalComponent';
import ButtonComponent from './components/ButtonComponent';
import Footer from './components/Footer';

const FILTERS = [
  { label: 'Todas', value: 'all' },
  { label: 'Pendentes', value: 'pending' },
  { label: 'Concluídas', value: 'completed' },
];

export default function App() {
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Treinar na academia', completed: false },
    { id: '2', text: 'Chegar ao trabalho', completed: false },
    { id: '3', text: 'Sair do trabalho', completed: false },
    { id: '4', text: 'Ir a faculdade', completed: false },
    { id: '5', text: 'Voltar para casa e finalizar o dia', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [removeTaskId, setRemoveTaskId] = useState(null);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompleted = id => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const openEditModal = (id, text) => {
    setEditTaskId(id);
    setEditTaskText(text);
    setEditModalVisible(true);
  };

  const saveEditTask = () => {
    setTasks(tasks.map(task =>
      task.id === editTaskId ? { ...task, text: editTaskText } : task
    ));
    setEditModalVisible(false);
    setEditTaskId(null);
    setEditTaskText('');
  };

  const openRemoveModal = id => {
    setRemoveTaskId(id);
    setRemoveModalVisible(true);
  };

  const confirmRemoveTask = () => {
    setTasks(tasks.filter(task => task.id !== removeTaskId));
    setRemoveModalVisible(false);
    setRemoveTaskId(null);
  };

  const renderTaskItem = ({ item }) => (
    <View style={[styles.taskItem, item.completed && styles.completedTask]}>
      <TouchableOpacityComponent
        style={styles.checkbox}
        onPress={() => toggleTaskCompleted(item.id)}
        textStyle={{ color: item.completed ? '#6200ee' : '#222' }}
      >
        {item.completed ? '✔️' : '⬜'}
      </TouchableOpacityComponent>
      <Text style={[styles.taskText, item.completed && styles.completedText]}>{item.text}</Text>
      <TouchableOpacityComponent
        style={styles.editBtn}
        onPress={() => openEditModal(item.id, item.text)}
        textStyle={{ color: '#1976d2' }}
      >Editar</TouchableOpacityComponent>
      <TouchableOpacityComponent
        style={styles.removeBtn}
        onPress={() => openRemoveModal(item.id)}
        textStyle={{ color: '#f03636' }}
      >Remover</TouchableOpacityComponent>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Tarefas</Text>
        <View style={styles.inputRow}>
          <TextInputComponent
            value={newTask}
            onChangeText={setNewTask}
            placeholder="Digite uma nova tarefa"
            style={{ flex: 1 }}
          />
          <ButtonComponent
            title="+"
            onPress={addTask}
            style={styles.addBtn}
            disabled={!newTask.trim()}
          />
        </View>
        <View style={styles.filterRow}>
          {FILTERS.map(f => (
            <ButtonComponent
              key={f.value}
              title={f.label}
              onPress={() => setFilter(f.value)}
              style={[styles.filterBtn, filter === f.value && styles.activeFilterBtn]}
              textStyle={filter === f.value ? { color: '#fff' } : { color: '#6200ee' }}
            />
          ))}
        </View>
        <FlatListComponent
          data={filteredTasks}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />
        <ModalComponent visible={editModalVisible} onRequestClose={() => setEditModalVisible(false)}>
          <Text style={styles.modalTitle}>Editar Tarefa</Text>
          <TextInputComponent
            value={editTaskText}
            onChangeText={setEditTaskText}
            placeholder="Editar tarefa"
          />
          <ButtonComponent title="Salvar" onPress={saveEditTask} style={styles.saveBtn} />
          <ButtonComponent title="Cancelar" onPress={() => setEditModalVisible(false)} style={styles.cancelBtn} />
        </ModalComponent>
        <ModalComponent visible={removeModalVisible} onRequestClose={() => setRemoveModalVisible(false)}>
          <Text style={styles.modalTitle}>Remover Tarefa?</Text>
          <ButtonComponent title="Confirmar" onPress={confirmRemoveTask} style={styles.confirmBtn} />
          <ButtonComponent title="Cancelar" onPress={() => setRemoveModalVisible(false)} style={styles.cancelBtn} />
        </ModalComponent>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#222',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  addBtn: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10,
  },
  filterBtn: {
    backgroundColor: '#fff',
    borderColor: '#6200ee',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 2,
  },
  activeFilterBtn: {
    backgroundColor: '#6200ee',
  },
  list: {
    marginTop: 10,
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    gap: 8,
  },
  completedTask: {
    backgroundColor: '#e0e0e0',
  },
  checkbox: {
    marginRight: 8,
    backgroundColor: 'transparent',
    padding: 0,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  editBtn: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 4,
  },
  removeBtn: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  saveBtn: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    marginTop: 10,
  },
  cancelBtn: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginTop: 10,
  },
  confirmBtn: {
    backgroundColor: '#f03636',
    borderRadius: 8,
    marginTop: 10,
  },
});
