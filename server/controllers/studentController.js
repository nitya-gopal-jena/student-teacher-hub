
export const signup = async (req, res) => {
    try {
        return res.status(200).json({ message: 'student signup route work' })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}