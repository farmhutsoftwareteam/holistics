import learnMoreData from "@/data/learnMore.json";

export interface LearnMoreItem {
  id: number;
  assetID: string;
  title: string;
  header: string;
  subtitle: string;
}

/**
 * Service class for handling learn more business logic and data
 */
export class LearnMoreService {
  /**
   * Get all learn more data items
   */
  static getItems(): LearnMoreItem[] {
    return learnMoreData.data as LearnMoreItem[];
  }

  /**
   * Get a specific learn more item by index
   * @param index The index of the item to retrieve
   */
  static getItem(index: number): LearnMoreItem | null {
    const items = this.getItems();
    if (index >= 0 && index < items.length) {
      return items[index];
    }
    return null;
  }

  /**
   * Get the total number of learn more items
   */
  static getTotalItems(): number {
    return this.getItems().length;
  }

  /**
   * Check if the current screen is the last one
   * @param currentIndex The index of the current screen
   */
  static isLastScreen(currentIndex: number): boolean {
    return currentIndex === this.getTotalItems() - 1;
  }

  /**
   * Get the image source for a learn more item based on index
   * @param index The index of the item
   */
  static getImageSource(index: number): string {
    return index === 0
      ? "https://res.cloudinary.com/dmaj8ih7p/image/upload/v1744626810/hair-loss-info-illustration_3x_skogop.png"
      : "https://res.cloudinary.com/dmaj8ih7p/image/upload/v1744626962/erectile-dysfunction-info-illustration_3x_p0u37i.png";
  }

  /**
   * Determine if the next action should navigate back or move to the next slide
   * @param currentIndex The index of the current screen
   */
  static getNextAction(currentIndex: number): {
    isLast: boolean;
    nextIndex: number;
  } {
    const isLast = this.isLastScreen(currentIndex);
    return {
      isLast,
      nextIndex: isLast ? currentIndex : currentIndex + 1,
    };
  }
}
