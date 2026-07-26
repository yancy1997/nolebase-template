export interface SocialEntry {
  type: 'github' | 'twitter' | 'email'
  icon: string
  link: string
}

export interface Creator {
  avatar: string
  name: string
  username?: string
  title?: string
  org?: string
  desc?: string
  links?: SocialEntry[]
  nameAliases?: string[]
  emailAliases?: string[]
}

const getAvatarUrl = (name: string) => `https://github.com/${name}.png`

export const creators: Creator[] = [
  {
    name: '陈瑜瑾',
    avatar: '',
    username: 'yancy1997',
    title: '数据产品经理 × AI 实践者',
    desc: '把复杂业务问题做成每天有人用的产品',
    links: [
      { type: 'github', icon: 'github', link: 'https://github.com/yancy1997' },
    ],
    nameAliases: ['yancy1997', 'yancy'],
    emailAliases: [],
  },
].map<Creator>((c) => {
  c.avatar = c.avatar || getAvatarUrl(c.username)
  return c as Creator
})

export const creatorNames = creators.map(c => c.name)
export const creatorUsernames = creators.map(c => c.username || '')
