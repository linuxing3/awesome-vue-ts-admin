import lfService from '@/utils/request.localforage';

export function axios({
  url, method, data, params,
}) {
  return lfService.request({
    url,
    method,
    data,
    params,
  });
}

export function create({ url, data }) {
  return lfService.request({
    url,
    method: 'post',
    data,
  });
}

export function update({ url, data }) {
  return lfService.request({
    url,
    method: 'patch',
    data,
  });
}

export function remove({ url, data }) {
  return lfService.request({
    url,
    method: 'delete',
    data,
  });
}

export function getOne({ url, data }) {
  return lfService.request({
    url,
    method: 'get',
    data,
  });
}

export function getMany({ url, params }) {
  return lfService.request({
    url,
    method: 'get',
    params,
  });
}
