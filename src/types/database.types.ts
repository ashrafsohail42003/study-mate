export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      roadmaps: {
        Row: {
          id: string
          title: string
          description: string | null
          icon: string | null
          color: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          icon?: string | null
          color?: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          icon?: string | null
          color?: string
          is_active?: boolean
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          category_id: string | null
          title: string
          description: string | null
          thumbnail_url: string | null
          icon: string
          level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | null
          xp_reward: number
          estimated_hours: number
          language: string
          instructor: string | null
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          title: string
          description?: string | null
          thumbnail_url?: string | null
          icon?: string
          level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | null
          xp_reward?: number
          estimated_hours?: number
          language?: string
          instructor?: string | null
          rating?: number
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          title?: string
          description?: string | null
          thumbnail_url?: string | null
          icon?: string
          level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | null
          xp_reward?: number
          estimated_hours?: number
          language?: string
          instructor?: string | null
          rating?: number
          created_at?: string
        }
      }
      roadmap_courses: {
        Row: {
          id: string
          roadmap_id: string | null
          course_id: string | null
          order_index: number
        }
        Insert: {
          id?: string
          roadmap_id?: string | null
          course_id?: string | null
          order_index?: number
        }
        Update: {
          id?: string
          roadmap_id?: string | null
          course_id?: string | null
          order_index?: number
        }
      }
      course_tags: {
        Row: {
          id: string
          course_id: string | null
          tag_id: string | null
        }
        Insert: {
          id?: string
          course_id?: string | null
          tag_id?: string | null
        }
        Update: {
          id?: string
          course_id?: string | null
          tag_id?: string | null
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string | null
          title: string
          content: string | null
          video_url: string | null
          type: 'Video' | 'Article' | 'Quiz' | 'Project'
          duration: number
          is_free: boolean
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          course_id?: string | null
          title: string
          content?: string | null
          video_url?: string | null
          type?: 'Video' | 'Article' | 'Quiz' | 'Project'
          duration?: number
          is_free?: boolean
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string | null
          title?: string
          content?: string | null
          video_url?: string | null
          type?: 'Video' | 'Article' | 'Quiz' | 'Project'
          duration?: number
          is_free?: boolean
          order_index?: number
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          student_id: string | null
          full_name: string
          email: string
          avatar_url: string | null
          university_id: string | null
          department: string | null
          current_semester: number
          tawjihi_year: number | null
          tawjihi_average: number | null
          current_roadmap_id: string | null
          bio: string | null
          telegram_user_id: number | null
          social_links: Json
          xp: number
          level: number
          badges: string[]
          created_at: string
          last_active: string
        }
        Insert: {
          id: string
          student_id?: string | null
          full_name: string
          email: string
          avatar_url?: string | null
          university_id?: string | null
          department?: string | null
          current_semester?: number
          tawjihi_year?: number | null
          tawjihi_average?: number | null
          current_roadmap_id?: string | null
          bio?: string | null
          telegram_user_id?: number | null
          social_links?: Json
          xp?: number
          level?: number
          badges?: string[]
          created_at?: string
          last_active?: string
        }
        Update: {
          id?: string
          student_id?: string | null
          full_name?: string
          email?: string
          avatar_url?: string | null
          university_id?: string | null
          department?: string | null
          current_semester?: number
          tawjihi_year?: number | null
          tawjihi_average?: number | null
          current_roadmap_id?: string | null
          bio?: string | null
          telegram_user_id?: number | null
          social_links?: Json
          xp?: number
          level?: number
          badges?: string[]
          created_at?: string
          last_active?: string
        }
      }
      university_subjects: {
        Row: {
          id: string
          code: string
          name: string
          instructor: string | null
          semester: string
          credits: number
          description: string | null
          university_id: string
          department: string
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          instructor?: string | null
          semester: string
          credits?: number
          description?: string | null
          university_id: string
          department: string
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          instructor?: string | null
          semester?: string
          credits?: number
          description?: string | null
          university_id?: string
          department?: string
          created_at?: string
        }
      }
      subject_enrollments: {
        Row: {
          id: string
          student_id: string
          subject_id: string
          status: 'Active' | 'Completed' | 'Dropped'
          semester: string
          grade: number | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          subject_id: string
          status?: 'Active' | 'Completed' | 'Dropped'
          semester: string
          grade?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          subject_id?: string
          status?: 'Active' | 'Completed' | 'Dropped'
          semester?: string
          grade?: number | null
          created_at?: string
        }
      }
      subject_resources: {
        Row: {
          id: string
          subject_id: string | null
          uploader_id: string | null
          parent_id: string | null
          type: 'Folder' | 'File'
          category: 'Books' | 'Assignments' | 'Labs' | 'Slides' | 'Projects' | 'Other' | null
          title: string
          description: string | null
          file_url: string | null
          telegram_file_id: string | null
          file_extension: string | null
          file_size: number | null
          mime_type: string | null
          upvotes: number
          downloads: number
          is_pinned: boolean
          created_at: string
        }
        Insert: {
          id?: string
          subject_id?: string | null
          uploader_id?: string | null
          parent_id?: string | null
          type: 'Folder' | 'File'
          category?: 'Books' | 'Assignments' | 'Labs' | 'Slides' | 'Projects' | 'Other' | null
          title: string
          description?: string | null
          file_url?: string | null
          telegram_file_id?: string | null
          file_extension?: string | null
          file_size?: number | null
          mime_type?: string | null
          upvotes?: number
          downloads?: number
          is_pinned?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          subject_id?: string | null
          uploader_id?: string | null
          parent_id?: string | null
          type?: 'Folder' | 'File'
          category?: 'Books' | 'Assignments' | 'Labs' | 'Slides' | 'Projects' | 'Other' | null
          title?: string
          description?: string | null
          file_url?: string | null
          telegram_file_id?: string | null
          file_extension?: string | null
          file_size?: number | null
          mime_type?: string | null
          upvotes?: number
          downloads?: number
          is_pinned?: boolean
          created_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          subject_id: string | null
          title: string
          description: string | null
          due_date: string | null
          is_completed: boolean
          status: 'Pending' | 'InProgress' | 'Completed'
          priority: 'Low' | 'Medium' | 'High'
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          subject_id?: string | null
          title: string
          description?: string | null
          due_date?: string | null
          is_completed?: boolean
          status?: 'Pending' | 'InProgress' | 'Completed'
          priority?: 'Low' | 'Medium' | 'High'
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          subject_id?: string | null
          title?: string
          description?: string | null
          due_date?: string | null
          is_completed?: boolean
          status?: 'Pending' | 'InProgress' | 'Completed'
          priority?: 'Low' | 'Medium' | 'High'
          created_at?: string
          completed_at?: string | null
        }
      }
      user_course_progress: {
        Row: {
          id: string
          user_id: string | null
          course_id: string | null
          status: 'NotStarted' | 'InProgress' | 'Completed'
          started_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          course_id?: string | null
          status?: 'NotStarted' | 'InProgress' | 'Completed'
          started_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          course_id?: string | null
          status?: 'NotStarted' | 'InProgress' | 'Completed'
          started_at?: string
          completed_at?: string | null
        }
      }
      user_lesson_progress: {
        Row: {
          id: string
          user_id: string | null
          lesson_id: string | null
          status: 'NotStarted' | 'InProgress' | 'Completed'
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          lesson_id?: string | null
          status?: 'NotStarted' | 'InProgress' | 'Completed'
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          lesson_id?: string | null
          status?: 'NotStarted' | 'InProgress' | 'Completed'
          completed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
