
import React from 'react';
import * as LucideIcons from 'lucide-react';

export const iconLibraries = {
  normal: {
    course: () => <LucideIcons.BookOpen className="w-5 h-5" />,
    instructor: () => <LucideIcons.User className="w-5 h-5" />,
    student: () => <LucideIcons.Users className="w-5 h-5" />,
    time: () => <LucideIcons.Clock className="w-5 h-5" />,
    price: () => <LucideIcons.DollarSign className="w-5 h-5" />,
    live: () => <LucideIcons.Play className="w-5 h-5" />,
    home: () => <LucideIcons.Home className="w-4 h-4" />,
    target: () => <LucideIcons.Target className="w-4 h-4" />,
    building: () => <LucideIcons.Building2 className="w-4 h-4" />,
    testimonial: () => <LucideIcons.MessageSquare className="w-4 h-4" />,
    help: () => <LucideIcons.HelpCircle className="w-4 h-4" />,
    contact: () => <LucideIcons.Mail className="w-4 h-4" />,
    about: () => <LucideIcons.Info className="w-4 h-4" />,
    tools: () => <LucideIcons.Wrench className="w-5 h-5" />
  },
  cartoon: {
    course: () => <LucideIcons.BookOpenCheck className="w-5 h-5" />,
    instructor: () => <LucideIcons.UserCheck className="w-5 h-5" />,
    student: () => <LucideIcons.GraduationCap className="w-5 h-5" />,
    time: () => <LucideIcons.Timer className="w-5 h-5" />,
    price: () => <LucideIcons.Coins className="w-5 h-5" />,
    live: () => <LucideIcons.Video className="w-5 h-5" />,
    home: () => <LucideIcons.House className="w-4 h-4" />,
    target: () => <LucideIcons.Crosshair className="w-4 h-4" />,
    building: () => <LucideIcons.Building className="w-4 h-4" />,
    testimonial: () => <LucideIcons.MessageCircle className="w-4 h-4" />,
    help: () => <LucideIcons.CircleHelp className="w-4 h-4" />,
    contact: () => <LucideIcons.MailOpen className="w-4 h-4" />,
    about: () => <LucideIcons.InfoIcon className="w-4 h-4" />,
    tools: () => <LucideIcons.Settings className="w-5 h-5" />
  },
  emoji: {
    course: () => <span className="text-lg">📚</span>,
    instructor: () => <span className="text-lg">👩‍🏫</span>,
    student: () => <span className="text-lg">👩‍🎓</span>,
    time: () => <span className="text-lg">🕐</span>,
    price: () => <span className="text-lg">💵</span>,
    live: () => <span className="text-lg">📹</span>,
    home: () => <span className="text-lg">🏠</span>,
    target: () => <span className="text-lg">🎯</span>,
    building: () => <span className="text-lg">🏢</span>,
    testimonial: () => <span className="text-lg">💬</span>,
    help: () => <span className="text-lg">❓</span>,
    contact: () => <span className="text-lg">📧</span>,
    about: () => <span className="text-lg">ℹ️</span>,
    tools: () => <span className="text-lg">🔧</span>
  },
  avatars: {
    course: () => <LucideIcons.Library className="w-5 h-5" />,
    instructor: () => <LucideIcons.UserSquare className="w-5 h-5" />,
    student: () => <LucideIcons.UsersRound className="w-5 h-5" />,
    time: () => <LucideIcons.AlarmClock className="w-5 h-5" />,
    price: () => <LucideIcons.CreditCard className="w-5 h-5" />,
    live: () => <LucideIcons.PlayCircle className="w-5 h-5" />,
    home: () => <LucideIcons.HomeIcon className="w-4 h-4" />,
    target: () => <LucideIcons.Focus className="w-4 h-4" />,
    building: () => <LucideIcons.Building2 className="w-4 h-4" />,
    testimonial: () => <LucideIcons.Quote className="w-4 h-4" />,
    help: () => <LucideIcons.LifeBuoy className="w-4 h-4" />,
    contact: () => <LucideIcons.AtSign className="w-4 h-4" />,
    about: () => <LucideIcons.FileText className="w-4 h-4" />,
    tools: () => <LucideIcons.Hammer className="w-5 h-5" />
  }
};
