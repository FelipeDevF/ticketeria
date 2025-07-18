import { DataSource } from "typeorm";
import * as ormconfig from './ormconfig';

export default new DataSource(ormconfig as any);