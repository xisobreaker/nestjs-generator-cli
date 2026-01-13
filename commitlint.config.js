module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    messages: {
      typeEmpty: '类型为空',
      subjectEmpty: '类型为空',
      emptyWarning: 'can not be empty',
    },
    questions: {
      type: {
        description: "选择提交类型",
        enum: {
          feat: {
            description: '新增功能 - 新增功能点、新增需求',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'BUG 修复 - 线上、测试、验收阶段的bug',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: '文档变更 - 文档增删改',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: '样式修改 - (空白、格式、分号缺失, 配置)',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: '代码重构 - 既不修复bug也不添加新功能的更改',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: '性能优化 - 性能优化',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: '测试代码 - 测试代码变更',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description: '编译代码 - 影响构建系统或外部依赖项的更改',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description: '持续集成 - 对CI配置文件和脚本的更改',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: "其他提交 - 除src目录或测试文件以外的修改",
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: '回退更改 - 执行 git revert 打印的 message',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description:
          '填写改动范围（如组件或文件名）',
      },
      subject: {
        description: '提供一个简短的描述',
      },
      body: {
        description: '提供一段详细的描述',
      },
      isBreaking: {
        description: '是破坏性修改吗?',
      },
      breakingBody: {
        description:
          '请提供 BREAKING CHANGE 的描述',
      },
      breaking: {
        description: '包含 BREAKING CHANGE 的提交必须提供更详细的描述',
      },
      isIssueAffected: {
        description: '此更改是否影响任何未决 issue ?',
      },
      issuesBody: {
        description:
          '如果 issues 已解决, 请提交详细描述',
      },
      issues: {
        description: '添加 issue 引用 (e.g. "fix #123", "re #123".)',
      },
    },
  },
};
