import { QuizType } from "./quiz/models";

export const quizTypes: QuizType []= [{
    type: 'India - State/Capital Quiz',
    description: 'This quiz is specific to the country of India. You will be asked question on capital of Indian states.',
    imagePath: '../../assets/images/India-state-capital.jpg',
    quizPath: 'https://gist.githubusercontent.com/riteshwaghela/e147ed05e60a1b040defec0a289ef44d/raw/3f500367fdcdc5e2e3b63f0964c311496026fe45/india-state-capital.json'
},
{
    type: 'Country Capital Quiz',
    description: 'This quiz is world quiz. You will be asked question on capital of different countries.',
    imagePath: '../../assets/images/Country-capital.jpg',
    quizPath: 'https://gist.githubusercontent.com/riteshwaghela/8cb6747c9a6759a3efccd3a79a604e8c/raw/b77e59f18e378ea2926eaf956145f0fd7abcbf86/country-capital.json'
},
{
    type: 'Asian Country Capital Quiz',
    description: 'This quiz is specific to Asia. You will be asked question on capital of Asian countries.',
    imagePath: '../../assets/images/Country-capital.jpg',
    quizPath: 'https://gist.githubusercontent.com/riteshwaghela/10db3070df03d9fc95b0032005900099/raw/a7add18bbbf993f69612debba730ce214df2128c/asian-country-capital.json'
}]