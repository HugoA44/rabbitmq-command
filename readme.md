# Bonjour 👋

### Documentation :

https://documenter.getpostman.com/view/13889263/2s8ZDeSHtj

## 🛠️ Lancement

```bash
yarn
```

```bash
docker compose up -d
```

```bash
yarn dev
```

## ➤ API Reference

### Créer un produit

```http
POST http://localhost:3000/api/commands
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `name`    | `string` | **Required**. Le nom                  |
| `status`  | `string` | **Required**. Par défaut : "progress" |

### Récupérer les commandes

```http
GET http://localhost:3000/api/commands
```

### Récupérer lune commande

```http
GET http://localhost:3000/api/commands/:id
```

| Parameter | Type  | Description        |
| :-------- | :---- | :----------------- |
| `id`      | `int` | **Required**. L'id |
