import express from 'express';
import { faker } from '@faker-js/faker';
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, res) => {
   res.render('index')
});

app.get('/examples', (req, res) => {
    res.render('examples')
});

app.get('/impact', (req, res) => {
    res.render('impact')
});

app.get('/ethical-ux', (req, res) => {
    res.render('ethical-ux')
});

app.get('/conclusion', async (req, res) => {
    try {
        // Get sample users from DummyJSON
        const response = await fetch(
            'https://dummyjson.com/users?limit=6'
        );

        if (!response.ok) {
            throw new Error('Unable to retrieve users');
        }

        const data = await response.json();

        // Fictional negative feedback
        const complaints = [
            "I thought I was getting a discount, but the original price was misleading.",
            "Canceling my subscription was unnecessarily difficult.",
            "I got a virus from a fake download button.",
            "There were unexpected fees added at the very last step.",
            "The countdown timer made me feel pressured to buy.",
            "I accidentally signed up for something I didn't want."
        ];

        // Combine DummyJSON users with Faker-generated feedback
        const reviews = data.users.map(user => ({
            name: `${user.firstName} ${user.lastName}`,
            image: user.image,
            rating: faker.number.int({ min: 1, max: 2 }),
            feedback: faker.helpers.arrayElement(complaints),
            date: faker.date.recent({ days: 30 })
                .toLocaleDateString()
        }));

        res.render('conclusion', {
            reviews: reviews
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Unable to load feedback');
    }
});

app.listen(3000, () => {
   console.log('server started');
});
