import { create } from 'zustand'
import blogService from './services/blogs'
import loginService from './services/login'

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
    }
}))

const useUserStore = create((set) => ({
    user: null,
    users: [],
    actions: {
        loginUser: async (username, password) => {
            const user = await loginService.login({ username, password })
            blogService.setToken(user.token)
            window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
            set({ user })
        },
        logoutUser: () => {
            window.localStorage.removeItem("loggedBlogappUser");
            blogService.setToken(null)
            set({ user: null })
        },
        initialize: () => {
            const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON);
                blogService.setToken(user.token)
                set({ user: user })
            }
        },

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