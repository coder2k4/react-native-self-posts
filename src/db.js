import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('post.db')

export class DB {
    static init() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'create table if not exists posts (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, booked INT)'
                    , []
                    , resolve
                    , (_, error) => reject(error)
                )
            })
        })
    }

    static getPosts() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'select * from posts'
                    , []
                    , (_, result) => resolve(result.rows._array)
                    , (_, error) => reject(error)
                )
            })
        })
    }


    static createPost({text, date, booked, img}) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO posts (text,date,booked,img) VALUES (?,?,?,?)'
                    , [text, date, booked, img]
                    , (_, result) => resolve(result.insertId)
                    , (_, error) => reject(error)
                )
            })
        })
    }

    static updatePost(post){
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE posts SET booked = ? WHERE id = ?'
                    , [post.booked ? 0 : 1, post.id]
                    , (_, result) => resolve(result.insertId)
                    , (_, error) => reject(error)
                )
            })
        })
    }

    static deletePost(id){
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM posts WHERE id = ?'
                    , [id]
                    , (_, result) => resolve(result.insertId)
                    , (_, error) => reject(error)
                )
            })
        })
    }

    static deleteDB(){
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DROP TABLE posts'
                    , []
                    , resolve
                    , (_, error) => reject(error)
                )
            })
        })
    }
}