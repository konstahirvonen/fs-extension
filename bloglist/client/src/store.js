import { create } from 'zustand'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import { getUser, saveUser, removeUser } from './services/persistentUser'

const useNotificationStore = create((set) => ({
    notification: null,
    actions: {
        setNotification: (message, type) => set({ notification: {message, type} }),
        clearNotification: () => set({ notification: null })
    }
}))

const useBlogStore = create((set, get) => ({
    blogs: [],
    actions: {
        add: async (content) => {
            await blogService.create(content).then((returned) => {
                set(state => ({ blogs: state.blogs.concat(returned) }))
            })
        },
        initialize: async () => {
            const blogs = await blogService.getAll()
            set(() => ({ blogs }))
        },
        like: async (id) => {
            const blog = get().blogs.find(b => b.id === id)
            const updated = await blogService.updateLikes(
                id, { ...blog, likes: blog.likes + 1 }
            )
            set(state => ({
                blogs: state.blogs.map(b => b.id === id ? updated : b)
            }))
        },
        remove: async (id) => {
            await blogService.removeBlog(id)
            set(state => ({
                blogs: state.blogs.filter(b => b.id !== id)
            }))
        },
        commentBlog: async (id, comment) => {
            const updatedBlog = await blogService.comment(id, comment)

            set(state => ({
                blogs: state.blogs.map(blog =>
                    blog.id === updatedBlog.id ? updatedBlog : blog
                )
            }))
        }
    }
}))

const useUserStore = create((set) => ({
    user: null,
    users: [],
    actions: {
        loginUser: async (username, password) => {
            const user = await loginService.login({ username, password })
            blogService.setToken(user.token)
            saveUser(user)
            set({ user })
        },
        logoutUser: () => {
            removeUser()
            blogService.setToken(null)
            set({ user: null })
        },
        initialize: () => {
            const user = getUser()
            if (user) {
                blogService.setToken(user.token)
                set({ user: user })
            }
        },
        initializeAllUsers: async () => {
            const users = await usersService.getAll()
            set(() => ({ users }))
        }
    }
}))

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
export const useBlogs = () => useBlogStore((state) => state.blogs)
export const useBlogActions = () => useBlogStore((state) => state.actions)
export const useUser = () => useUserStore((state) => state.user)
export const useUsers = () => useUserStore((state) => state.users)
export const useUserActions = () => useUserStore((state) => state.actions)


export default useBlogStore