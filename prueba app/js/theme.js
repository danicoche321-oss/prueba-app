tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#E63946', // Premium Red
                    50: '#FDECEC',
                    100: '#FBD9DA',
                    200: '#F7B4B6',
                    300: '#F38E92',
                    400: '#EF696E',
                    500: '#E63946', // Base
                    600: '#CF1D2A',
                    700: '#A61722',
                    800: '#7D1119',
                    900: '#530B11'
                },
                secondary: '#1D3557', // Navy Blue contrast
                accent: '#A8DADC',    // Light Blue accent
                background: '#F1FAEE', // Off-white background
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
        }
    }
}
