const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seed = async () => {
  const bakedGoods = [
    {
      title: 'Blueberry Muffin',
      description:
        'A deliciously fluffy muffin, bursting with juicy, fresh blueberries in every bite, complemented by a subtle hint of lemon zest. Perfectly moist and tender, ideal for breakfast or a sweet snack.',
      image: '/blueberrymuffin.jpg',
    },
    {
      title: 'Chocolate Chip Cookie',
      description:
        'A timeless classic, these cookies feature a perfectly crisp edge with a soft, chewy center. Every bite is packed with gooey, melted chocolate chips, making it an irresistible treat for all ages.',
      image: '/chocolatechipcookie.jpg',
    },
    {
      title: 'Cinnamon Roll',
      description:
        "This soft, pillowy roll is swirled with a rich, aromatic blend of cinnamon sugar and topped with a generous layer of sweet, creamy icing. A warm, indulgent treat that's perfect any time of the day.",
      image: '/cinnamonroll.jpg',
    },
    {
      title: 'Lemon Tart',
      description:
        "A zesty lemon tart featuring a tangy, smooth lemon curd nestled in a crisp, buttery crust. Finished with a dollop of light, fluffy whipped cream, it's a refreshing dessert with a perfect balance of flavors.",
      image: '/lemontart.jpg',
    },
    {
      title: 'Banana Bread',
      description:
        "This moist and tender banana bread is infused with the natural sweetness of ripe bananas, complemented by a subtle touch of cinnamon. It's a comforting, homemade loaf perfect for breakfast or a snack.",
      image: '/bananabread.jpg',
    },
    {
      title: 'Raspberry Scone',
      description:
        'A buttery, crumbly scone filled with juicy, tart raspberries. Perfectly balanced in sweetness, it pairs wonderfully with tea or coffee, making it an ideal choice for breakfast, brunch, or an afternoon treat.',
      image: '/raspberryscone.jpg',
    },
    {
      title: 'Pumpkin Pie',
      description:
        "This classic pie features a smooth, creamy pumpkin filling, spiced with the warm flavors of cinnamon, nutmeg, and cloves. Encased in a flaky, buttery crust, it's the quintessential dessert for fall gatherings.",
      image: '/pumpkinpie.jpg',
    },
    {
      title: 'Almond Croissant',
      description:
        'A delicate, flaky croissant filled with sweet almond paste and topped with a sprinkle of sliced almonds. The perfect balance of buttery layers and nutty sweetness, ideal for a luxurious breakfast or treat.',
      image: '/almondcroissant.jpg',
    },
    {
      title: 'Red Velvet Cupcake',
      description:
        "A moist, rich red velvet cupcake topped with a swirl of tangy, smooth cream cheese frosting. With its vibrant color and indulgent flavor, it's a delightful treat that's as beautiful as it is delicious.",
      image: '/redvelvetcupcake.jpg',
    },
    {
      title: 'Apple Strudel',
      description:
        'A crisp, golden pastry filled with tender, spiced apples and plump raisins. Finished with a dusting of powdered sugar, this traditional dessert offers a delightful combination of flavors and textures in every bite.',
      image: '/applestrudel.jpg',
    },
  ];

  for (const bakedGood of bakedGoods) {
    await prisma.BakedGood.create({
      data: bakedGood,
    });
  }
};

async function main() {
  try {
    await seed();
    console.log('Seeding completed');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
