export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if(this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        // First we update the quality
        this.updateItemQuality(this.items[i]);

        // Then we decrease the sellIn
        this.items[i].sellIn--;
  
        // To finish we handle the expired item
        if (this.items[i].sellIn < 0) {
          this.handleExpiredItem(this.items[i]);
        }
      }  
    }

    return this.items;
  }

  private updateItemQuality(item: Item) {
    switch (item.name) {
      case 'Aged Brie':
        this.increaseQuality(item);
        break;
      case 'Backstage passes to a TAFKAL80ETC concert':
        this.increaseQuality(item);
        if (item.sellIn < 11) this.increaseQuality(item);
        if (item.sellIn < 6) this.increaseQuality(item);
        break;
      default:
        /*if(item.name.includes('Conjured')) {
          this.decreaseQuality(item);
        }*/
        this.decreaseQuality(item);
        break;
    }
  }

  private handleExpiredItem(item: Item) {
    switch (item.name) {
      case 'Aged Brie':
        this.increaseQuality(item);
        break;
      case 'Backstage passes to a TAFKAL80ETC concert':
        item.quality = 0;
        break;
      default:
        this.decreaseQuality(item);
        break;
    }
  }

  private increaseQuality(item: Item) {
    if (item.quality < 50) {
      item.quality++;
    }
  }

  private decreaseQuality(item: Item) {
    if (item.quality > 0) {
      item.quality--;
    }
  }
}
