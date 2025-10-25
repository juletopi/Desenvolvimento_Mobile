// ItemList.jsx
import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import ListItem from "./ListItem";

/**
 * Componente que renderiza uma lista de itens.
 */
const ItemList = ({ items = [], onEdit, onDelete }) => {
    const renderItem = ({ item }) => (
        <ListItem item={item} onEdit={onEdit} onDelete={onDelete} />
    );

    return (
        <FlatList
            data={items}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Nenhum item disponível</Text>
                </View>
            }
            contentContainerStyle={items.length === 0 ? styles.emptyList : null}
        />
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#999",
    },
    emptyList: {
        flexGrow: 1,
        justifyContent: "center",
    },
});

export default ItemList;
