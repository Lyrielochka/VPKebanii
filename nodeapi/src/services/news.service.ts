import { News } from "../entities/news.entity";
import { Repository } from "typeorm";
import { TestConnection } from "../data-access/test.connection";

type FilterNewsDTO = {
  title?: string;
  category?: string;
  author?: string;
  date?: string;
};

type CreateNewsDTO = {
  title: string;
  category: string;
  author: string;
  date: string;
  img?: string;
  summary: string;
  images?: string[] | null;
};

type UpdateNewsDTO = {
  title?: string;
  category?: string;
  author?: string;
  date?: string;
  img?: string;
  summary?: string;
  images?: string[] | null;
};

export class NewsService {
  private newsRepo: Repository<News>;

  constructor() {
    this.newsRepo = TestConnection.getRepository(News);
  }

  private normalizeImages(images?: string[] | null): string[] | null | undefined {
    if (images === undefined) {
      return undefined;
    }
    if (images === null) {
      return null;
    }
    if (!Array.isArray(images)) {
      return undefined;
    }

    const cleaned = images
      .map((img) => (typeof img === "string" ? img.trim() : ""))
      .filter((img) => img.length > 0);

    if (cleaned.length === 0) {
      return null;
    }

    return [...new Set(cleaned)];
  }

  async findNews(filters?: FilterNewsDTO): Promise<News[]> {
    return await this.newsRepo.find({ where: { ...filters } });
  }

  async findNewsById(idNews: number): Promise<News | undefined> {
    return await this.newsRepo.findOne({ where: { idNews } });
  }

  async createNews(body: CreateNewsDTO): Promise<News> {
    const images = this.normalizeImages(body.images);
    const newItem = this.newsRepo.create({
      ...body,
      images: images === undefined ? null : images,
    });
    return await this.newsRepo.save(newItem);
  }

  async updateNews(idNews: number, body: UpdateNewsDTO): Promise<boolean> {
    const images = this.normalizeImages(body.images);
    const payload: UpdateNewsDTO = { ...body };

    if (images === undefined) {
      delete payload.images;
    } else {
      payload.images = images;
    }

    const result = await this.newsRepo.update(idNews, payload);
    return result.affected !== 0;
  }

  async deleteNews(idNews: number): Promise<boolean> {
    const result = await this.newsRepo.delete(idNews);
    return result.affected !== 0;
  }
}
