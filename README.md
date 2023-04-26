Хостинг: https://js-core-todo.vercel.app/

1) Зачем тебе и конфиг и плагин притиера? Чем конфиг от плагина отличается? И что дока притиера по этому поводу говорит?
Плагин — это пакет npm, который может добавлять различные расширения к конфигурациям. Плагины позволяют добавлять в проект собственные настраиваемые правила. В общем позволяет расширять конфигурацию, которая заложена изначально. Например, если юзаем реакт, то должны добавить плагин, так как у стандартного eslint нет правил для него.
eslint-config-prettier — нужен, для того, чтобы за стиль кода отвечал только Prettier, иначе у линтера и притиера будут конфликты по части оформления кода.
	
2) Линтер на прекомит можно было сразу на фикс запустить

	
3) plugin:react/jsx-runtime - это что, откуда и для чего?

Из доки React: Because the new JSX transform will automatically import the necessary react/jsx-runtime functions, React will no longer need to be in scope when you use JSX. This might lead to unused React imports in your code.
Из доки eslint-plugin-react: If you are using the new JSX transform from React 17, extend react/jsx-runtime in your eslint config (add "plugin:react/jsx-runtime" to "extends") to disable the relevant rules.
Т.к. использую 18 ноду, то решила, что это как раз мой случай и нужно добавить это в расширения, чтобы линтер не ругался, что у меня нет импортов React from react. 

4) Точно стоило в плагины подлкючать плагины, если они в конифге аир бнб уже настроены?
Да, согласна, оставляю только react, т.к. нужен для расширения plugin:react/jsx-runtime, правильно?
