# syntax=docker/dockerfile:1

FROM python:3.12-slim

WORKDIR /app

RUN rm -rf /var/lib/apt/lists/* /usr/share/doc /usr/share/man \
  && apt-get clean
 

COPY requirements.txt requirements.txt
RUN pip3 install --no-warn-script-location --no-cache-dir -r requirements.txt

ENV PYTHONUNBUFFERED="true" \
    PYTHONPATH="."

COPY . .

EXPOSE 8080
CMD ["gunicorn", "-c", "python:config.gunicorn", "app:app"]
