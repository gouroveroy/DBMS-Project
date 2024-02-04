export default function Fruits() {
    // const fruits = ["apple", "banana", "dates"];
    const fruits = [
        {
            name: "apple",
            price: 100,
            emoji: "🍎"
        },
        {
            name: "banana",
            price: 10,
            emoji: "🍌"
        },
        {
            name: "dates",
            price: 20,
            emoji: "🥧"
        },
    ];

    return (
        <div>
            <ul>
                {fruits.map((fruit) => (
                    <li key={fruit}>
                        {fruit.emoji} {fruit.name} ${fruit.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}
