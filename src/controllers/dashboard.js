import { latest as latest_client, search as search_client } from "./client";
import {
  latest as latest_performance,
  search as search_performance,
} from "./performance";

export function latest() {
  return Promise.all([latest_client(), latest_performance({})]);
}

export function search(query) {
  return Promise.all([search_client(query), search_performance(query)]);
}
