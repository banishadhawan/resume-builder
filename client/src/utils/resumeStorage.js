import { dummyResumeData } from '../assets/assets'

const STORAGE_KEY = 'resume-builder-resumes'

const hasStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

export const normalizeResumeId = (resumeId) => {
    if (!resumeId) {
        return ''
    }

    try {
        return decodeURIComponent(resumeId).trim()
    } catch {
        return String(resumeId).trim()
    }
}

export const getStoredResumes = () => {
    if (!hasStorage()) {
        return []
    }

    try {
        const rawResumes = window.localStorage.getItem(STORAGE_KEY)
        if (!rawResumes) {
            return []
        }

        const parsedResumes = JSON.parse(rawResumes)
        return Array.isArray(parsedResumes) ? parsedResumes : []
    } catch {
        return []
    }
}

export const getAllResumes = () => {
    const storedResumes = getStoredResumes()
    const storedResumeIds = new Set(storedResumes.map((resume) => resume._id))
    const defaultResumes = dummyResumeData.filter((resume) => !storedResumeIds.has(resume._id))

    return [...storedResumes, ...defaultResumes]
}

export const getResumeById = (resumeId) => {
    const normalizedResumeId = normalizeResumeId(resumeId)
    return getAllResumes().find((resume) => resume._id === normalizedResumeId) || null
}

const generateResumeId = () => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID()
    }

    return `resume-${Date.now()}`
}

export const createResumeRecord = (title = 'Untitled Resume') => {
    const timestamp = new Date().toISOString()

    return {
        _id: generateResumeId(),
        title: title.trim() || 'Untitled Resume',
        personal_info: {},
        professional_summary: '',
        experience: [],
        education: [],
        project: [],
        skills: [],
        template: 'classic',
        accent_color: '#3B82F6',
        public: false,
        createdAt: timestamp,
        updatedAt: timestamp,
    }
}

export const saveResume = (resume) => {
    if (!resume?._id || !hasStorage()) {
        return resume
    }

    const nextResume = {
        ...resume,
        createdAt: resume.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    const storedResumes = getStoredResumes()
    const existingIndex = storedResumes.findIndex((item) => item._id === nextResume._id)

    if (existingIndex >= 0) {
        storedResumes[existingIndex] = nextResume
    } else {
        storedResumes.unshift(nextResume)
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedResumes))
    return nextResume
}

export const deleteStoredResume = (resumeId) => {
    if (!hasStorage()) {
        return
    }

    const normalizedResumeId = normalizeResumeId(resumeId)
    const remainingResumes = getStoredResumes().filter((resume) => resume._id !== normalizedResumeId)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(remainingResumes))
}